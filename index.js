#!/usr/bin/env node
"use strict";

import { zip } from "./commands/zip.js";
import { initRepo } from "./commands/init_repo.js";
import { gitBackup } from "./commands/git_backup.js";

if (process.argv.includes("-z") || process.argv.includes("--zip")) {
    zip();
} else if (process.argv.includes("-i") || process.argv.includes("--init")) {
    initRepo();
} else {
    gitBackup();
}
