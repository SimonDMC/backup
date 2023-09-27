import exec from "child_process";
import chalk from "chalk";
import { getTimestamp } from "../util/time.js";

export function initRepo() {
    let repoLink;
    // 4 because first 2 are node and index.js, 3rd is -i
    if (process.argv.length < 4) {
        // no repo link provided
        console.log(chalk.red("No repository URL provided!"));
        return;
    }
    repoLink = process.argv[3];

    // use custom commit message if provided
    let msg;
    if (process.argv.length > 4) {
        msg = process.argv.slice(4).join(" ");
    } else {
        // if empty, use default
        msg = "Initial commit";
    }

    let commands = [
        "git init",
        "git add -A",
        `git commit -m "${msg}"`,
        "git branch -M main",
        `git remote add origin ${repoLink}`,
        "git push -u origin main",
    ];

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
                else console.log(`${getTimestamp()} ${chalk.green("Repository created!")}`);
            }
        });
    }

    console.log(`${getTimestamp()} ${chalk.yellow("Starting repository creation...")}`);
    run(0);
}
