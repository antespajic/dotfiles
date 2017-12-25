"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
function getWorkDir(filepath) {
    try {
        const path = child_process_1.execSync("stack query", { cwd: path_1.dirname(filepath) }).toString();
        const re = /.*path:\s*(.*?)\s*?\n/;
        var extract = re.exec(path)[1];
        // Windows
        if (/^win/.test(process.platform)) {
            extract = extract.replace(/\\/g, "/");
            // Windows also include the drive 
            // extract = extract.slice(2, extract.length);
        }
        return { cwd: extract };
    }
    catch (e) {
        return {};
    }
}
exports.getWorkDir = getWorkDir;
//# sourceMappingURL=workDir.js.map