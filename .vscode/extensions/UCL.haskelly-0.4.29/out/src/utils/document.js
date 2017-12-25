"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizePath(dirtyPath) {
    let filePath = dirtyPath;
    if (process.platform === 'win32') {
        filePath = filePath.charAt(0).toUpperCase() + filePath.substr(1);
    }
    return filePath;
}
exports.normalizePath = normalizePath;
//# sourceMappingURL=document.js.map