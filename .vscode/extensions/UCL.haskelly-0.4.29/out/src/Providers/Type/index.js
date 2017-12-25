"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const InteroSpawn_1 = require("../InteroSpawn");
const other_1 = require("../../utils/other");
const document_1 = require("../../utils/document");
class TypeProvider {
    provideHover(document, position, token) {
        return new Promise((resolve, reject) => {
            // current editor
            const editor = vscode.window.activeTextEditor;
            let filePath = document_1.normalizePath(document.uri.fsPath);
            // check if there is no selection
            if (editor.selection.isEmpty || !editor.selection.contains(position)) {
                const wordInfo = other_1.getNearWord(position, document.getText());
                InteroSpawn_1.default.getInstance().requestType(filePath, position, wordInfo)
                    .then(hover => {
                    resolve(hover);
                });
            }
            else {
                InteroSpawn_1.default.getInstance().requestType(filePath, position, { word: "", start: editor.selection.start.character, end: editor.selection.end.character })
                    .then(hover => {
                    resolve(hover);
                });
            }
        });
    }
}
exports.default = TypeProvider;
//# sourceMappingURL=index.js.map