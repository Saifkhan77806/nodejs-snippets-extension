import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "nodejsSnippets.createApiStructure",
    async () => {
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
        await vscode.workspace.fs.createDirectory(
          vscode.Uri.joinPath(rootUri, folder)
        );
      }

      const appJs = vscode.Uri.joinPath(rootUri, "src/app.js");
      const packJson = vscode.Uri.joinPath(rootUri, "src/package.json");

      await vscode.workspace.fs.writeFile(
        packJson,
        Buffer.from(
          `
          {
  "name": "node-js snippets",
  "version": "1.0.0",
  "description": "",
  "main": "src/app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
          `
        )
      );

      await vscode.workspace.fs.writeFile(
        appJs,
        Buffer.from(
          `import express from 'express';
const app = express();

app.use(express.json());


`
        )
      );

      vscode.window.showInformationMessage(
        "Node.js API structure created successfully"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
