import path from "path";
import zipper from "zip-local";
import fse from "fs-extra";
import chalk from "chalk";
import { getZipDateString, getTimestamp } from "../util/time.js";
import { runCommandHooks } from "../util/command_hooks.js";

export function zip() {
    const here = process.cwd();
    const parent = path.resolve(here, "..");
    const foldername = here.split(path.sep).slice(-1)[0];

    // run command hooks before zipping
    runCommandHooks();

    console.log(`${getTimestamp()} ${chalk.yellow("Zipping folder...")}`);

    // generate random id to copy everything into
    const randomID = "backup-" + Math.random().toString(36).substring(2, 15);
    const tempBackupPath = path.resolve(parent, randomID, foldername);

    // copy everything into temporary folder to prepare for zip
    fse.copySync(here, tempBackupPath);

    // append date to zip name
    const zipName = `${foldername} Backup@${getZipDateString()}.zip`;

    // zip temporary folder
    zipper.sync
        .zip(path.resolve(parent, randomID))
        .compress()
        .save(parent + path.sep + zipName);

    console.log(`${getTimestamp()} ${chalk.green("Folder zipped to")} ${chalk.yellow(zipName)}`);

    // delete temporary folder
    fse.removeSync(path.resolve(parent, randomID));
}
