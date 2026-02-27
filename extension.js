const vscode = require('vscode');
const path = require('path');
const player = require('play-sound')();

function activate(context) {
    vscode.window.showInformationMessage('Fahh is now watching your mistakes...');

    const disposable = vscode.window.onDidEndTerminalShellExecution(event => {
        const exitCode = event.exitCode;

        if (exitCode !== undefined && exitCode !== 0) {
            // This looks for the mp3 right next to this script file
            const soundPath = path.join(__dirname, 'fahh.mp3');
            
            player.play(soundPath, (err) => {
                if (err) {
                    console.error("Sound error:", err);
                    vscode.window.showErrorMessage("Fahh couldn't find the mp3 at: " + soundPath);
                }
            });
        }
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;