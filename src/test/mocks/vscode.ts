// Mock vscode module for unit testing
export const window = {
    activeColorTheme: {
        kind: 1 // Light theme
    }
};

export const ColorThemeKind = {
    Light: 1,
    Dark: 2,
    HighContrast: 3
};