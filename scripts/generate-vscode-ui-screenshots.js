#!/usr/bin/env node

/**
 * VSCode UI Screenshot Generator for Project Frimouss Extension
 * 
 * This script generates realistic mockups of the VSCode UI showing the extension in action.
 * It creates HTML files that simulate:
 * - Status bar with project avatar
 * - Webview panel with full avatar display
 */

const fs = require('fs');
const path = require('path');

// Import the avatar generator core (compiled JS)
const { AvatarGeneratorCore } = require('../out/avatarGeneratorCore');

const SCREENSHOTS_DIR = path.join(__dirname, '../screenshots');
const VSCODE_UI_DIR = path.join(SCREENSHOTS_DIR, 'vscode-ui');
const TEST_PROJECTS = ['project-alpha', 'project-beta'];

// Ensure directories exist
[SCREENSHOTS_DIR, VSCODE_UI_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

console.log('🎨 VSCode UI Screenshot Generator for Project Frimouss\n');
console.log(`Output directory: ${VSCODE_UI_DIR}\n`);

// VSCode color schemes
const themes = {
    light: {
        name: 'Light',
        kind: 1,
        bg: '#ffffff',
        sidebar: '#f3f3f3',
        statusBar: '#007acc',
        statusBarText: '#ffffff',
        editor: '#ffffff',
        text: '#333333',
        border: '#e5e5e5'
    },
    dark: {
        name: 'Dark',
        kind: 2,
        bg: '#1e1e1e',
        sidebar: '#252526',
        statusBar: '#007acc',
        statusBarText: '#ffffff',
        editor: '#1e1e1e',
        text: '#cccccc',
        border: '#3e3e42'
    }
};

// Generate screenshots for each project and theme
for (const projectName of TEST_PROJECTS) {
    console.log(`Generating VSCode UI screenshots for: ${projectName}`);
    
    for (const [themeName, theme] of Object.entries(themes)) {
        // Generate avatar
        const avatarSvg = AvatarGeneratorCore.generateAvatar(projectName, { kind: theme.kind });
        const avatarDataUri = AvatarGeneratorCore.generateAvatarDataUri(projectName, { kind: theme.kind });
        
        // Generate status bar mockup
        const statusBarHtml = generateStatusBarMockup(projectName, avatarDataUri, theme);
        const statusBarPath = path.join(VSCODE_UI_DIR, `${projectName}-${themeName}-statusbar.html`);
        fs.writeFileSync(statusBarPath, statusBarHtml);
        console.log(`  ✓ ${projectName}-${themeName}-statusbar.html`);
        
        // Generate webview panel mockup
        const webviewHtml = generateWebviewMockup(projectName, avatarSvg, theme);
        const webviewPath = path.join(VSCODE_UI_DIR, `${projectName}-${themeName}-webview.html`);
        fs.writeFileSync(webviewPath, webviewHtml);
        console.log(`  ✓ ${projectName}-${themeName}-webview.html`);
        
        // Generate full VSCode window mockup
        const fullWindowHtml = generateFullWindowMockup(projectName, avatarSvg, avatarDataUri, theme);
        const fullWindowPath = path.join(VSCODE_UI_DIR, `${projectName}-${themeName}-full.html`);
        fs.writeFileSync(fullWindowPath, fullWindowHtml);
        console.log(`  ✓ ${projectName}-${themeName}-full.html`);
    }
    console.log('');
}

// Generate index page
console.log('Generating VSCode UI comparison page...');
const indexHtml = generateVSCodeIndexPage();
const indexPath = path.join(VSCODE_UI_DIR, 'index.html');
fs.writeFileSync(indexPath, indexHtml);
console.log(`  ✓ index.html`);

console.log('\n✅ VSCode UI screenshots generated successfully!');
console.log(`\nOpen ${path.join(VSCODE_UI_DIR, 'index.html')} in your browser to view VSCode mockups.\n`);

// HTML generation functions

function generateStatusBarMockup(projectName, avatarDataUri, theme) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VSCode Status Bar - ${projectName} (${theme.name})</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #2d2d30;
            padding: 40px;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        .title {
            padding: 20px;
            background: ${theme.bg};
            color: ${theme.text};
            border-bottom: 1px solid ${theme.border};
            text-align: center;
        }
        .vscode-window {
            background: ${theme.bg};
        }
        .status-bar {
            background: ${theme.statusBar};
            color: ${theme.statusBarText};
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            font-size: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .status-left, .status-right {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .status-item {
            display: flex;
            align-items: center;
            gap: 5px;
            cursor: pointer;
            padding: 2px 6px;
            border-radius: 3px;
            transition: background 0.2s;
        }
        .status-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        .status-item.project-avatar {
            background: rgba(255, 255, 255, 0.15);
            font-weight: 500;
        }
        .avatar-icon {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-size: contain;
        }
        .description {
            padding: 30px;
            background: ${theme.bg};
            color: ${theme.text};
            border-top: 1px solid ${theme.border};
        }
        .description h3 {
            margin-bottom: 10px;
            color: #007acc;
        }
        .highlight {
            background: rgba(0, 122, 204, 0.1);
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="title">
            <h2>VSCode Status Bar - ${projectName} (${theme.name} Theme)</h2>
        </div>
        <div class="vscode-window">
            <div class="status-bar">
                <div class="status-left">
                    <div class="status-item project-avatar" title="Project Avatar - Click to view">
                        <img src="${avatarDataUri}" class="avatar-icon" alt="${projectName} avatar">
                        <span>${projectName}</span>
                    </div>
                    <div class="status-item">
                        <span>🔔</span>
                    </div>
                </div>
                <div class="status-right">
                    <div class="status-item">
                        <span>UTF-8</span>
                    </div>
                    <div class="status-item">
                        <span>LF</span>
                    </div>
                    <div class="status-item">
                        <span>JavaScript</span>
                    </div>
                    <div class="status-item">
                        <span>✓</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="description">
            <h3>Status Bar Integration</h3>
            <p>The Project Frimouss extension adds a status bar item (left side) showing:</p>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li>Project avatar icon (16px, circular)</li>
                <li>Project name: <span class="highlight">${projectName}</span></li>
                <li>Click to open full avatar panel</li>
                <li>Hover tooltip: "Project Avatar - Click to view"</li>
            </ul>
            <p>The avatar automatically updates when:</p>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li>Workspace folder changes</li>
                <li>Color theme changes (light/dark)</li>
                <li>Refresh command is executed</li>
            </ul>
        </div>
    </div>
</body>
</html>`;
}

function generateWebviewMockup(projectName, avatarSvg, theme) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VSCode Webview Panel - ${projectName} (${theme.name})</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #2d2d30;
            padding: 40px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        .title-bar {
            padding: 15px 20px;
            background: ${theme.bg};
            color: ${theme.text};
            border-bottom: 1px solid ${theme.border};
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .title-bar h2 {
            font-size: 14px;
            font-weight: 500;
        }
        .webview-content {
            background: ${theme.editor};
            color: ${theme.text};
            padding: 40px;
            min-height: 600px;
        }
        .avatar-container {
            text-align: center;
            margin-bottom: 30px;
        }
        .avatar-large {
            width: 200px;
            height: 200px;
            margin: 0 auto 20px;
        }
        .project-name {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
            color: ${theme.text};
        }
        .description {
            font-size: 14px;
            color: ${theme.text};
            opacity: 0.8;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .sizes-grid {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 40px;
            padding: 30px;
            background: ${theme.bg === '#ffffff' ? '#f8f9fa' : 'rgba(255,255,255,0.05)'};
            border-radius: 10px;
        }
        .size-demo {
            text-align: center;
        }
        .size-label {
            margin-top: 10px;
            font-size: 12px;
            color: ${theme.text};
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="title-bar">
            <h2>Project Avatar</h2>
            <span style="opacity: 0.5; font-size: 12px;">Webview Panel</span>
        </div>
        <div class="webview-content">
            <div class="avatar-container">
                <div class="avatar-large">${avatarSvg}</div>
                <div class="project-name">${projectName}</div>
                <div class="description">
                    This is your project's unique avatar, generated from the project directory name "${projectName}". 
                    The design uses a consistent algorithm to create the same avatar every time, 
                    with colors and characters derived from your project name.
                </div>
            </div>
            
            <div class="sizes-grid">
                <div class="size-demo">
                    <div style="width: 64px; height: 64px; margin: 0 auto;">${avatarSvg}</div>
                    <div class="size-label">64px</div>
                </div>
                <div class="size-demo">
                    <div style="width: 32px; height: 32px; margin: 0 auto;">${avatarSvg}</div>
                    <div class="size-label">32px</div>
                </div>
                <div class="size-demo">
                    <div style="width: 16px; height: 16px; margin: 0 auto;">${avatarSvg}</div>
                    <div class="size-label">16px</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

function generateFullWindowMockup(projectName, avatarSvg, avatarDataUri, theme) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VSCode - ${projectName} (${theme.name})</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #2d2d30;
            padding: 20px;
        }
        .window {
            max-width: 1600px;
            margin: 0 auto;
            background: ${theme.bg};
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .title-bar {
            height: 35px;
            background: ${theme.bg === '#ffffff' ? '#e5e5e5' : '#3c3c3c'};
            display: flex;
            align-items: center;
            padding: 0 15px;
            border-bottom: 1px solid ${theme.border};
        }
        .window-controls {
            display: flex;
            gap: 8px;
        }
        .window-control {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        .window-control.close { background: #ff5f57; }
        .window-control.minimize { background: #febc2e; }
        .window-control.maximize { background: #28ca42; }
        .menu-bar {
            height: 35px;
            background: ${theme.bg};
            border-bottom: 1px solid ${theme.border};
            display: flex;
            align-items: center;
            padding: 0 10px;
            gap: 5px;
            font-size: 13px;
            color: ${theme.text};
        }
        .menu-item {
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 3px;
        }
        .menu-item:hover {
            background: ${theme.bg === '#ffffff' ? '#e5e5e5' : 'rgba(255,255,255,0.1)'};
        }
        .main-content {
            display: flex;
            height: 700px;
        }
        .sidebar {
            width: 50px;
            background: ${theme.sidebar};
            border-right: 1px solid ${theme.border};
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
            gap: 15px;
        }
        .sidebar-icon {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 5px;
            font-size: 20px;
        }
        .sidebar-icon:hover {
            background: rgba(255,255,255,0.1);
        }
        .sidebar-icon.active {
            border-left: 2px solid #007acc;
        }
        .explorer {
            width: 250px;
            background: ${theme.sidebar};
            border-right: 1px solid ${theme.border};
            padding: 10px;
        }
        .explorer-header {
            color: ${theme.text};
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 10px;
            opacity: 0.6;
        }
        .file-tree {
            color: ${theme.text};
            font-size: 13px;
        }
        .file-item {
            padding: 4px 8px;
            cursor: pointer;
            border-radius: 3px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .file-item:hover {
            background: rgba(255,255,255,0.05);
        }
        .editor-area {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .tab-bar {
            height: 35px;
            background: ${theme.bg};
            border-bottom: 1px solid ${theme.border};
            display: flex;
            align-items: center;
        }
        .tab {
            height: 100%;
            padding: 0 15px;
            display: flex;
            align-items: center;
            gap: 8px;
            background: ${theme.editor};
            border-right: 1px solid ${theme.border};
            color: ${theme.text};
            font-size: 13px;
            cursor: pointer;
        }
        .tab.active {
            border-top: 1px solid #007acc;
        }
        .editor {
            flex: 1;
            background: ${theme.editor};
            padding: 20px;
            overflow: auto;
            color: ${theme.text};
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.6;
        }
        .panel {
            flex: 1;
            background: ${theme.editor};
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .avatar-showcase {
            text-align: center;
        }
        .avatar-large {
            width: 200px;
            height: 200px;
            margin: 0 auto 20px;
        }
        .project-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
            color: ${theme.text};
        }
        .panel-description {
            font-size: 14px;
            color: ${theme.text};
            opacity: 0.8;
            max-width: 500px;
            line-height: 1.6;
        }
        .status-bar {
            height: 22px;
            background: ${theme.statusBar};
            color: ${theme.statusBarText};
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            font-size: 12px;
        }
        .status-left, .status-right {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .status-item {
            display: flex;
            align-items: center;
            gap: 5px;
            cursor: pointer;
            padding: 2px 6px;
            border-radius: 3px;
        }
        .status-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        .status-item.project-avatar {
            background: rgba(255, 255, 255, 0.15);
            font-weight: 500;
        }
        .avatar-icon {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-size: contain;
        }
    </style>
</head>
<body>
    <div class="window">
        <div class="title-bar">
            <div class="window-controls">
                <div class="window-control close"></div>
                <div class="window-control minimize"></div>
                <div class="window-control maximize"></div>
            </div>
        </div>
        
        <div class="menu-bar">
            <div class="menu-item">File</div>
            <div class="menu-item">Edit</div>
            <div class="menu-item">Selection</div>
            <div class="menu-item">View</div>
            <div class="menu-item">Go</div>
            <div class="menu-item">Run</div>
            <div class="menu-item">Terminal</div>
            <div class="menu-item">Help</div>
        </div>
        
        <div class="main-content">
            <div class="sidebar">
                <div class="sidebar-icon active">📁</div>
                <div class="sidebar-icon">🔍</div>
                <div class="sidebar-icon">⎇</div>
                <div class="sidebar-icon">▶</div>
                <div class="sidebar-icon">⚙️</div>
            </div>
            
            <div class="explorer">
                <div class="explorer-header">${projectName.toUpperCase()}</div>
                <div class="file-tree">
                    <div class="file-item">📄 README.md</div>
                    <div class="file-item">📄 index.js</div>
                </div>
            </div>
            
            <div class="editor-area">
                <div class="tab-bar">
                    <div class="tab active">
                        <span>📄</span>
                        <span>README.md</span>
                        <span>×</span>
                    </div>
                    <div class="tab">
                        <span>🎨</span>
                        <span>Project Avatar</span>
                        <span>×</span>
                    </div>
                </div>
                
                <div class="panel">
                    <div class="avatar-showcase">
                        <div class="avatar-large">${avatarSvg}</div>
                        <div class="project-title">${projectName}</div>
                        <div class="panel-description">
                            This is your project's unique avatar, generated from the directory name.
                            Click the status bar item to toggle this panel.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="status-bar">
            <div class="status-left">
                <div class="status-item project-avatar" title="Project Avatar - Click to view">
                    <img src="${avatarDataUri}" class="avatar-icon" alt="${projectName} avatar">
                    <span>${projectName}</span>
                </div>
                <div class="status-item">🔔</div>
            </div>
            <div class="status-right">
                <div class="status-item">UTF-8</div>
                <div class="status-item">LF</div>
                <div class="status-item">Markdown</div>
                <div class="status-item">✓</div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

function generateVSCodeIndexPage() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Frimouss - VSCode UI Screenshots</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        header {
            text-align: center;
            color: white;
            margin-bottom: 50px;
        }
        h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        .tagline {
            font-size: 1.3em;
            opacity: 0.95;
        }
        .info-banner {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 40px;
            color: white;
        }
        .screenshot-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }
        .screenshot-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        .screenshot-card h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.5em;
        }
        .screenshot-link {
            display: block;
            padding: 12px 20px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin: 8px 0;
            transition: background 0.2s;
            text-align: center;
        }
        .screenshot-link:hover {
            background: #5568d3;
        }
        .theme-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 5px;
            font-size: 0.85em;
            margin-left: 8px;
        }
        .theme-badge.light {
            background: #ffd93d;
            color: #333;
        }
        .theme-badge.dark {
            background: #2d3748;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎨 Project Frimouss - VSCode UI</h1>
            <p class="tagline">Extension Screenshots Inside VSCode Editor</p>
        </header>
        
        <div class="info-banner">
            <h2>VSCode UI Screenshots</h2>
            <p>These mockups show exactly how the Project Frimouss extension appears when installed in Visual Studio Code. Each screenshot demonstrates different aspects of the extension's integration:</p>
            <ul style="margin-top: 15px; padding-left: 20px;">
                <li>Status Bar - Shows project avatar icon and name in the bottom status bar</li>
                <li>Webview Panel - Full avatar display opened by clicking the status bar</li>
                <li>Full Window - Complete VSCode window with extension active</li>
            </ul>
        </div>
        
        <div class="screenshot-grid">
            ${TEST_PROJECTS.map(project => `
                <div class="screenshot-card">
                    <h3>${project}</h3>
                    
                    <h4 style="margin-top: 20px; color: #555;">Full VSCode Window</h4>
                    <a href="${project}-light-full.html" class="screenshot-link">
                        View Full Window <span class="theme-badge light">☀️ Light</span>
                    </a>
                    <a href="${project}-dark-full.html" class="screenshot-link">
                        View Full Window <span class="theme-badge dark">🌙 Dark</span>
                    </a>
                    
                    <h4 style="margin-top: 20px; color: #555;">Status Bar Only</h4>
                    <a href="${project}-light-statusbar.html" class="screenshot-link">
                        View Status Bar <span class="theme-badge light">☀️ Light</span>
                    </a>
                    <a href="${project}-dark-statusbar.html" class="screenshot-link">
                        View Status Bar <span class="theme-badge dark">🌙 Dark</span>
                    </a>
                    
                    <h4 style="margin-top: 20px; color: #555;">Webview Panel</h4>
                    <a href="${project}-light-webview.html" class="screenshot-link">
                        View Webview <span class="theme-badge light">☀️ Light</span>
                    </a>
                    <a href="${project}-dark-webview.html" class="screenshot-link">
                        View Webview <span class="theme-badge dark">🌙 Dark</span>
                    </a>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;
}
