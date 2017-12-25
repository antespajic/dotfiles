"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const other_1 = require("../../utils/other");
const document_1 = require("../../utils/document");
class HaskellDefinitionProvider {
    constructor(interoSpawn) {
        this.interoSpawn = interoSpawn;
    }
    provideDefinition(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const wordInfo = other_1.getNearWord(position, document.getText());
            const filePath = document_1.normalizePath(document.uri.fsPath);
            const definitionLocation = yield this.interoSpawn.requestDefinition(filePath, position, wordInfo);
            return this.buildLocation(definitionLocation);
        });
    }
    buildLocation(location) {
        const { filePath, rangeInFile } = this.splitPathAndRange(location);
        const uri = vscode.Uri.file(filePath);
        const range = this.extractRange(rangeInFile);
        return new vscode.Location(uri, range);
    }
    splitPathAndRange(location) {
        const separatorIndex = location.lastIndexOf(':');
        return {
            filePath: location.slice(0, separatorIndex),
            rangeInFile: location.slice(separatorIndex + 1)
        };
    }
    extractRange(symbolLoc) {
        const [line1, column1, line2, column2] = symbolLoc
            .match(/^\((\d+),(\d+)\)-\((\d+),(\d+)\)$/)
            .slice(1, 5)
            .map(num => parseInt(num, 10) - 1);
        return new vscode.Range(line1, column1, line2, column2);
    }
}
exports.default = HaskellDefinitionProvider;
//# sourceMappingURL=index.js.map