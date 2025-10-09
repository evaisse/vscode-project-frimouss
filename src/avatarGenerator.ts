import * as vscode from 'vscode';
import { AvatarGeneratorCore, ThemeInfo } from './avatarGeneratorCore';

export interface AvatarConfig {
    size: number;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
}

export class AvatarGenerator {
    /**
     * Get theme info from VSCode
     */
    private static getVSCodeTheme(): ThemeInfo {
        return {
            kind: vscode.window.activeColorTheme.kind
        };
    }

    /**
     * Generate SVG avatar for a project name
     */
    public static generateAvatar(projectName: string): string {
        const theme = this.getVSCodeTheme();
        return AvatarGeneratorCore.generateAvatar(projectName, theme);
    }

    /**
     * Convert SVG to data URI for use in status bar
     */
    public static svgToDataUri(svg: string): string {
        return AvatarGeneratorCore.svgToDataUri(svg);
    }

    /**
     * Generate avatar data URI for a project name
     */
    public static generateAvatarDataUri(projectName: string): string {
        const theme = this.getVSCodeTheme();
        return AvatarGeneratorCore.generateAvatarDataUri(projectName, theme);
    }
}