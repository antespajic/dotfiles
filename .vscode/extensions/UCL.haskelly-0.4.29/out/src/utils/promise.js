"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function delay(msec) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, msec);
    });
}
exports.delay = delay;
//# sourceMappingURL=promise.js.map