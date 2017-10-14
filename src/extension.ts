'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as safeEval from 'safe-eval';

// Wrap safeEval to keep indentation
function sEval(x, ctx) {
    var indent = x.substr(0, x.indexOf(x.trim()));
    return indent + safeEval(x, ctx);
}

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

    let ctx = {
    }

    let disposable1 = vscode.commands.registerCommand('extension.evaluateAndReplaceSelection', () => {
        const editor = vscode.window.activeTextEditor;
        var selections: vscode.Selection[] = editor.selections;
        selections = selections.sort(compareSelection)

        editor.edit(builder => {
            ctx['i'] = 0;
            for (const selection of selections) {
                var text = editor.document.getText(selection);
                var result = text.split('\n').map(val => sEval(val, ctx)).join('\n');
                builder.replace(selection, result);
            }
        });
    });

    let disposable2 = vscode.commands.registerCommand('extension.evaluateInGlobalContext', () => {
        const editor = vscode.window.activeTextEditor;
        var selections: vscode.Selection[] = editor.selections;
        selections = selections.sort(compareSelection)

        editor.edit(builder => {
            ctx['i'] = 0;
            for (const selection of selections) {
                var text = editor.document.getText(selection);
                var sep = text.indexOf('=');
                var name = text.substr(0, sep).trim();
                var value = text.substr(sep + 1).trim();
                ctx[name] = value.split('\n').map(val => sEval(val, ctx)).join('\n');;
                ctx['i'] += 1;
            }
        });
    });

    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
