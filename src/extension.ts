'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as safeEval from 'safe-eval';

// Selections are sorted by their start position
function compareSelection(a, b) {
    if (a.start.line < b.start.line) {
        return -1;
    }
    if (a.start.line > b.start.line) {
        return 1;
    }
    if (a.start.character < b.start.character) {
        return -1;
    }
    if (a.start.character > b.start.character) {
        return 1;
    }
    return 0;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "eval-selection" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.evaluateSelectionInplace', () => {
        const editor = vscode.window.activeTextEditor;
        var selections: vscode.Selection[] = editor.selections;
        selections = selections.sort(compareSelection)

        editor.edit(builder => {
            var ctx = {
                'i': 0,
            }

            for (const selection of selections) {
                var text = editor.document.getText(selection);
                builder.replace(selection, safeEval(text, ctx).toString());
                ctx['i'] += 1;
            }
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
