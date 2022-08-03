#!/usr/bin/env node
'use strict';

import exec from 'child_process';
import chalk from 'chalk';

// get current time in DD/MM/YY HH:MM AM/PM format
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear().toString().slice(-2);
const hours = date.getHours() % 12 == 0 ? 12 : date.getHours() % 12;
const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
const dateString = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;

let msg = `Backup @ ${dateString}`;

if (process.argv.length > 2) {
    msg = process.argv.slice(2).join(' ');
}

let commands = [
    'git add -A',
    `git commit -m "${msg}"`,
    'git push'
];

let run = (i) => {
    exec.exec(commands[i], (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
    }).on('exit', code => {
        if (code == 0) {
            console.log(`${chalk.gray(commands[i])} ${chalk.blue('successful')}`);
            if (i < commands.length-1) run(i + 1);
            else console.log(chalk.green('Backup complete!'));
        }
    })
}

console.log(chalk.yellow('Starting backup...'));
run(0);