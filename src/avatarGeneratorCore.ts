export interface ThemeInfo {
    kind: number;
}

export interface AvatarConfig {
    size: number;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
}

export class AvatarGeneratorCore {
    private static readonly AVATAR_SIZE = 16;
    private static readonly CHAR_LAYERS = 3;

    /**
     * Generate a consistent hash from a string
     */
    public static simpleHash(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    /**
     * Get a color from the theme
     */
    public static getThemeColors(theme?: ThemeInfo): AvatarConfig {
        // Get theme kind to adjust colors accordingly
        const themeKind = theme?.kind || 1; // Default to light
        const isDark = themeKind === 2 || themeKind === 3; // Dark or HighContrast
        
        // Default colors based on theme
        let backgroundColor = isDark ? '#333333' : '#f0f0f0';
        let textColor = isDark ? '#ffffff' : '#000000';
        let accentColor = '#007acc'; // VSCode blue
        
        return {
            size: this.AVATAR_SIZE,
            backgroundColor,
            textColor,
            accentColor
        };
    }

    /**
     * Generate HSL color based on hash and theme
     */
    public static generateColorFromHash(hash: number, saturation: number = 70, lightness: number = 50): string {
        const hue = hash % 360;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    /**
     * Get characters to display from project name
     */
    public static getCharactersFromName(name: string): string[] {
        const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        if (cleanName.length === 0) {
            return ['?'];
        }
        
        const chars: string[] = [];
        
        // First character (largest)
        chars.push(cleanName[0]);
        
        // Second character if available (medium)
        if (cleanName.length > 1) {
            chars.push(cleanName[1]);
        }
        
        // Last character if different and available (smallest)
        if (cleanName.length > 2 && cleanName[cleanName.length - 1] !== cleanName[0]) {
            chars.push(cleanName[cleanName.length - 1]);
        }
        
        return chars;
    }

    /**
     * Generate SVG avatar for a project name
     */
    public static generateAvatar(projectName: string, theme?: ThemeInfo): string {
        const hash = this.simpleHash(projectName);
        const chars = this.getCharactersFromName(projectName);
        const themeColors = this.getThemeColors(theme);
        
        // Generate consistent colors based on hash
        const baseHue = hash % 360;
        const baseColor = this.generateColorFromHash(hash, 65, 50);
        const accentColor1 = this.generateColorFromHash(hash + 123, 70, 35);
        const accentColor2 = this.generateColorFromHash(hash + 456, 60, 65);
        
        const size = 200; // Use fixed larger size for better display
        const radius = size / 2;
        
        // Create SVG with circular design and layered characters
        let svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">`;
        
        // Add gradient definition
        svg += `<defs>
            <radialGradient id="bgGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:${baseColor};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${accentColor1};stop-opacity:1" />
            </radialGradient>
        </defs>`;
        
        // Background circle with gradient
        svg += `<circle cx="${radius}" cy="${radius}" r="${radius}" fill="url(#bgGradient)"/>`;
        
        // Add subtle border
        svg += `<circle cx="${radius}" cy="${radius}" r="${radius - 2}" fill="none" stroke="${accentColor2}" stroke-width="2" opacity="0.3"/>`;
        
        // Add character layers with different sizes and positions
        const fontSizes = [size * 0.4, size * 0.25, size * 0.15];
        const opacities = [0.9, 0.6, 0.4];
        const offsets = [
            { x: 0, y: 0 },
            { x: size * 0.12, y: -size * 0.08 },
            { x: -size * 0.08, y: size * 0.12 }
        ];
        
        chars.forEach((char, index) => {
            if (index >= fontSizes.length) return;
            
            const fontSize = fontSizes[index];
            const opacity = opacities[index];
            const offset = offsets[index];
            const x = radius + offset.x;
            const y = radius + offset.y;
            
            let textColor = themeColors.textColor;
            if (index === 1) textColor = accentColor2;
            if (index === 2) textColor = '#ffffff';
            
            // Add text shadow for better visibility
            svg += `<text x="${x}" y="${y}" ` +
                   `font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" ` +
                   `fill="${textColor}" opacity="${opacity}" ` +
                   `text-anchor="middle" dominant-baseline="central">${char}</text>`;
        });
        
        svg += '</svg>';
        
        return svg;
    }

    /**
     * Convert SVG to data URI for use in status bar
     */
    public static svgToDataUri(svg: string): string {
        const encoded = encodeURIComponent(svg);
        return `data:image/svg+xml,${encoded}`;
    }

    /**
     * Generate avatar data URI for a project name
     */
    public static generateAvatarDataUri(projectName: string, theme?: ThemeInfo): string {
        const svg = this.generateAvatar(projectName, theme);
        return this.svgToDataUri(svg);
    }
}