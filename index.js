#!/usr/bin/env node
"use strict";

import exec from "child_process";
import chalk from "chalk";
import path from "path";
import zipper from "zip-local";
import fse from "fs-extra";

// get current time in DD/MM/YY HH:MM AM/PM format
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear().toString().slice(-2);
const hours = date.getHours() % 12 == 0 ? 12 : date.getHours() % 12;
const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
const ampm = date.getHours() >= 12 ? "PM" : "AM";
const dateString = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;

let msg = `Backup @ ${dateString}`;

// zip backup
if (process.argv.includes("-z") || process.argv.includes("--zip")) {
    const here = process.cwd();
    const parent = path.resolve(here, "..");
    const foldername = here.split(path.sep).slice(-1)[0];
    // generate random id to copy everything into
    const randomID = "backup-" + Math.random().toString(36).substring(2, 15);
    const tempBackupPath = path.resolve(parent, randomID, foldername);
    // copy everything into temporary folder to prepare for zip
    fse.copySync(here, tempBackupPath);
    // append date to zip name
    const zipName = `${foldername} Backup@${dateString
        .replaceAll("/", "-")
        .replaceAll(":", ".")}.zip`;
    // zip temporary folder
    zipper.sync
        .zip(path.resolve(parent, randomID))
        .compress()
        .save(parent + path.sep + zipName);
    console.log(chalk.green("Folder zipped to ") + chalk.yellow(zipName));
    // delete temporary folder
    fse.removeSync(path.resolve(parent, randomID));
} else {
    if (process.argv.length > 2) {
        msg = process.argv.slice(2).join(" ");
    }

    let commands = ["git add -A", `git commit -m "${msg}"`, "git push"];

    let run = (i) => {
        exec.exec(commands[i], (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        }).on("exit", (code) => {
            if (code == 0) {
                console.log(
                    `${chalk.gray(commands[i])} ${chalk.blue("successful")}`
                );
                if (i < commands.length - 1) run(i + 1);
                else console.log(chalk.green("Backup complete!"));
            }
        });
    };

    console.log(chalk.yellow("Starting backup..."));
    run(0);
}
