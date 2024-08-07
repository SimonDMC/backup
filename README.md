# Backup

A simple command line tool to backup your files using git or zip

## Installation

Install the CLI globally using npm:

```sh
npm i -g @simondmc/backup
```

# Usage

## Git Backup

To backup up files using git, make sure you have a git repository, then run `backup` or `backup <commit message>` in a terminal.

## Zip Backup

To backup a folder using zip, navigate to **inside** that folder, open the terminal and run `backup -z` or `backup --zip`.

## Repository Creation

To initialize a git repository (and immediately backup), run `backup -i <remote url>` or `backup -i <remote url> <commit message>`
in a terminal.

## Command Hooks

Command hooks allow you to run arbitrary commands before each backup. To use them, create a file called `backup-hooks.txt`
in the working directory, with commands separated by newlines. You can use the `#` symbol for comments.
