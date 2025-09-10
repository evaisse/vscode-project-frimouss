import * as vscode from 'vscode';
import * as path from 'path';
import { AvatarGenerator } from './avatarGenerator';

let statusBarItem: vscode.StatusBarItem;
let avatarWebviewPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Project Frimouss extension is now active!');

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'projectFrimouss.showAvatar';
    statusBarItem.tooltip = 'Project Avatar - Click to view';
    context.subscriptions.push(statusBarItem);

    // Register command to show avatar
    const showAvatarCommand = vscode.commands.registerCommand('projectFrimouss.showAvatar', () => {
        showAvatarPanel(context);
    });
    context.subscriptions.push(showAvatarCommand);

    // Register command to refresh avatar
    const refreshCommand = vscode.commands.registerCommand('projectFrimouss.refreshAvatar', () => {
        updateAvatar();
        if (avatarWebviewPanel) {
            updateAvatarWebview();
        }
        vscode.window.showInformationMessage('Project avatar refreshed!');
    });
    context.subscriptions.push(refreshCommand);

    // Update avatar when workspace changes
    const workspaceChangeDisposable = vscode.workspace.onDidChangeWorkspaceFolders(() => {
        updateAvatar();
        if (avatarWebviewPanel) {
            updateAvatarWebview();
        }
    });
    context.subscriptions.push(workspaceChangeDisposable);

    // Update avatar when color theme changes
    const themeChangeDisposable = vscode.window.onDidChangeActiveColorTheme(() => {
        updateAvatar();
        if (avatarWebviewPanel) {
            updateAvatarWebview();
        }
    });
    context.subscriptions.push(themeChangeDisposable);

    // Initial avatar update
    updateAvatar();
}

function getProjectName(): string {
    // Get the workspace folder name
    const workspaceFolders = vscode.workspace.workspaceFolders;
    
    if (workspaceFolders && workspaceFolders.length > 0) {
        // Use the first workspace folder's basename
        const workspaceFolder = workspaceFolders[0];
        return path.basename(workspaceFolder.uri.fsPath);
    }
    
    // Fallback to workspace name or default
    return vscode.workspace.name || 'Unknown';
}

function updateAvatar() {
    const projectName = getProjectName();
    
    try {
        // Update status bar item with project name and avatar icon
        statusBarItem.text = `$(symbol-color) ${projectName}`;
        statusBarItem.tooltip = `Project: ${projectName} - Click to view avatar`;
        statusBarItem.show();
        
        console.log(`Avatar updated for project: ${projectName}`);
        
    } catch (error) {
        console.error('Failed to update avatar:', error);
        statusBarItem.text = `$(warning) ${projectName}`;
        statusBarItem.tooltip = `Project: ${projectName} (Avatar generation failed)`;
        statusBarItem.show();
    }
}

function showAvatarPanel(context: vscode.ExtensionContext) {
    // If panel already exists, just reveal it
    if (avatarWebviewPanel) {
        avatarWebviewPanel.reveal();
        return;
    }

    // Create new webview panel
    avatarWebviewPanel = vscode.window.createWebviewPanel(
        'projectFrimousAvatar',
        'Project Avatar',
        vscode.ViewColumn.Beside,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );

    // Handle panel disposal
    avatarWebviewPanel.onDidDispose(() => {
        avatarWebviewPanel = undefined;
    });

    // Set initial content
    updateAvatarWebview();
}

function updateAvatarWebview() {
    if (!avatarWebviewPanel) {
        return;
    }

    const projectName = getProjectName();
    const avatarSvg = AvatarGenerator.generateAvatar(projectName);
    
    // Create HTML content for the webview
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Avatar</title>
        <style>
            body {
                font-family: var(--vscode-font-family);
                color: var(--vscode-foreground);
                background-color: var(--vscode-editor-background);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
                box-sizing: border-box;
            }
            .avatar-container {
                text-align: center;
                margin-bottom: 20px;
            }
            .avatar {
                width: 200px;
                height: 200px;
                margin-bottom: 20px;
                border-radius: 50%;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            .project-name {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .description {
                font-size: 14px;
                opacity: 0.8;
                max-width: 400px;
                line-height: 1.5;
            }
            .avatar-sizes {
                display: flex;
                gap: 20px;
                align-items: center;
                margin-top: 30px;
            }
            .size-demo {
                text-align: center;
            }
            .size-label {
                font-size: 12px;
                opacity: 0.7;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="avatar-container">
            <div class="avatar">${avatarSvg}</div>
            <div class="project-name">${projectName}</div>
            <div class="description">
                This is your project's unique avatar, generated from the project directory name "${projectName}". 
                The design uses a consistent algorithm to create the same avatar every time, 
                with colors and characters derived from your project name.
            </div>
        </div>
        
        <div class="avatar-sizes">
            <div class="size-demo">
                <div style="width: 64px; height: 64px;">${avatarSvg}</div>
                <div class="size-label">64px</div>
            </div>
            <div class="size-demo">
                <div style="width: 32px; height: 32px;">${avatarSvg}</div>
                <div class="size-label">32px</div>
            </div>
            <div class="size-demo">
                <div style="width: 16px; height: 16px;">${avatarSvg}</div>
                <div class="size-label">16px</div>
            </div>
        </div>
    </body>
    </html>
    `;

    avatarWebviewPanel.webview.html = html;
}

export function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
    if (avatarWebviewPanel) {
        avatarWebviewPanel.dispose();
    }
}