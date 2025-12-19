"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
function activate(context) {
    const disposable = vscode.commands.registerCommand("nodejsSnippets.createApiStructure", async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("Please open a folder first");
            return;
        }
        const rootUri = workspaceFolders[0].uri;
        const folders = [
            "src/controllers",
            "src/routes",
            "src/services",
            "src/models",
            "src/middlewares",
            "src/utils",
        ];
        for (const folder of folders) {
            await vscode.workspace.fs.createDirectory(vscode.Uri.joinPath(rootUri, folder));
        }
        const appJs = vscode.Uri.joinPath(rootUri, "src/app.js");
        await vscode.workspace.fs.writeFile(appJs, Buffer.from(`const express = require('express');
const app = express();

app.use(express.json());

module.exports = app;
`));
        vscode.window.showInformationMessage("Node.js API structure created successfully");
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map