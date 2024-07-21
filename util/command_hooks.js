import fs from "fs";
import path from "path";
import exec from "child_process";
import chalk from "chalk";
import { getTimestamp } from "./time.js";

export function runCommandHooks() {
    // check for backup-hooks.txt
    const hooksPath = path.resolve(process.cwd(), "backup-hooks.txt");

    if (!fs.existsSync(hooksPath)) {
        console.log(`${getTimestamp()} ${chalk.gray("No hooks found...")}`);
        return;
    }

    // ignore comments and empty lines
    const hooks = fs
        .readFileSync(hooksPath, "utf-8")
        .split("\n")
        .filter((line) => line.trim() && !line.startsWith("#"));

    console.log(`${getTimestamp()} ${chalk.yellow("Running hooks...")}`);

    hooks.forEach((hook) => {
        exec.execSync(hook, { stdio: "inherit" });
        console.log(`${getTimestamp()} ${chalk.gray(hook)} ${chalk.green("✓")}`);
    });
}
