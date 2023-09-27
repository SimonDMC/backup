import exec from "child_process";
import chalk from "chalk";
import { getDateString, getTimestamp } from "../util/time.js";

export function gitBackup() {
    let msg;
    // use whatever is passed after the command as the commit message
    if (process.argv.length > 2) {
        msg = process.argv.slice(2).join(" ");
    } else {
        // if empty, use current date+time
        msg = `Backup @ ${getDateString()}`;
    }

    let commands = ["git add -A", `git commit -m "${msg}"`, "git push"];

    function run(i) {
        exec.exec(commands[i], (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        }).on("exit", (code) => {
            if (code == 0) {
                console.log(`${getTimestamp()} ${chalk.gray(commands[i])} ${chalk.green("✓")}`);
                if (i < commands.length - 1) run(i + 1);
                else console.log(`${getTimestamp()} ${chalk.green("Backup Complete!")}`);
            }
        });
    }

    console.log(`${getTimestamp()} ${chalk.yellow("Starting backup...")}`);
    run(0);
}
