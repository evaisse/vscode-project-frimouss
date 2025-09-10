import * as assert from 'assert';
import { AvatarGeneratorCore } from '../../avatarGeneratorCore';

suite('AvatarGeneratorCore Tests', () => {
    
    suite('simpleHash', () => {
        test('should generate consistent hash for same input', () => {
            const projectName = 'test-project';
            const hash1 = AvatarGeneratorCore.simpleHash(projectName);
            const hash2 = AvatarGeneratorCore.simpleHash(projectName);
            assert.strictEqual(hash1, hash2, 'Hash should be consistent for same input');
        });

        test('should generate different hashes for different inputs', () => {
            const hash1 = AvatarGeneratorCore.simpleHash('project-one');
            const hash2 = AvatarGeneratorCore.simpleHash('project-two');
            assert.notStrictEqual(hash1, hash2, 'Different inputs should generate different hashes');
        });

        test('should handle empty string', () => {
            const hash = AvatarGeneratorCore.simpleHash('');
            assert.strictEqual(typeof hash, 'number', 'Should return a number for empty string');
            assert.strictEqual(hash, 0, 'Empty string should hash to 0');
        });
    });

    suite('getCharactersFromName', () => {
        test('should extract first character from simple name', () => {
            const chars = AvatarGeneratorCore.getCharactersFromName('test');
            assert.ok(chars.includes('T'), 'Should include first character');
        });

        test('should extract multiple characters from longer name', () => {
            const chars = AvatarGeneratorCore.getCharactersFromName('my-awesome-project');
            assert.ok(chars.length >= 1, 'Should extract at least one character');
            assert.strictEqual(chars[0], 'M', 'First character should be M');
        });

        test('should handle names with special characters', () => {
            const chars = AvatarGeneratorCore.getCharactersFromName('test-project_123');
            assert.ok(chars.length >= 1, 'Should extract characters from name with special chars');
            assert.strictEqual(chars[0], 'T', 'First character should be T');
        });

        test('should handle empty or special-only names', () => {
            const chars = AvatarGeneratorCore.getCharactersFromName('---');
            assert.strictEqual(chars[0], '?', 'Should return ? for names with no alphanumeric characters');
        });
    });

    suite('generateColorFromHash', () => {
        test('should generate valid HSL color', () => {
            const color = AvatarGeneratorCore.generateColorFromHash(12345);
            assert.ok(color.startsWith('hsl('), 'Should generate HSL color');
            assert.ok(color.includes('%'), 'Should include percentage values');
            assert.ok(color.endsWith(')'), 'Should end with closing parenthesis');
        });

        test('should generate consistent colors for same hash', () => {
            const hash = 12345;
            const color1 = AvatarGeneratorCore.generateColorFromHash(hash);
            const color2 = AvatarGeneratorCore.generateColorFromHash(hash);
            assert.strictEqual(color1, color2, 'Should generate consistent colors');
        });
    });

    suite('getThemeColors', () => {
        test('should generate theme colors for light theme', () => {
            const themeColors = AvatarGeneratorCore.getThemeColors({ kind: 1 });
            assert.ok(themeColors.backgroundColor, 'Should have background color');
            assert.ok(themeColors.textColor, 'Should have text color');
            assert.ok(themeColors.accentColor, 'Should have accent color');
            assert.strictEqual(typeof themeColors.size, 'number', 'Should have numeric size');
        });

        test('should generate theme colors for dark theme', () => {
            const themeColors = AvatarGeneratorCore.getThemeColors({ kind: 2 });
            assert.ok(themeColors.backgroundColor, 'Should have background color');
            assert.ok(themeColors.textColor, 'Should have text color');
            assert.ok(themeColors.accentColor, 'Should have accent color');
        });

        test('should handle undefined theme', () => {
            const themeColors = AvatarGeneratorCore.getThemeColors();
            assert.ok(themeColors.backgroundColor, 'Should have default background color');
            assert.ok(themeColors.textColor, 'Should have default text color');
            assert.ok(themeColors.accentColor, 'Should have default accent color');
        });
    });

    suite('generateAvatar', () => {
        test('should generate SVG string', () => {
            const avatar = AvatarGeneratorCore.generateAvatar('test-project');
            assert.ok(avatar.startsWith('<svg'), 'Should start with SVG tag');
            assert.ok(avatar.endsWith('</svg>'), 'Should end with SVG closing tag');
            assert.ok(avatar.includes('width='), 'Should include width attribute');
            assert.ok(avatar.includes('height='), 'Should include height attribute');
        });

        test('should generate consistent avatar for same project name', () => {
            const projectName = 'consistent-project';
            const avatar1 = AvatarGeneratorCore.generateAvatar(projectName);
            const avatar2 = AvatarGeneratorCore.generateAvatar(projectName);
            assert.strictEqual(avatar1, avatar2, 'Should generate identical avatars for same project name');
        });

        test('should generate different avatars for different project names', () => {
            const avatar1 = AvatarGeneratorCore.generateAvatar('project-one');
            const avatar2 = AvatarGeneratorCore.generateAvatar('project-two');
            assert.notStrictEqual(avatar1, avatar2, 'Should generate different avatars for different names');
        });

        test('should handle special characters in project name', () => {
            const avatar = AvatarGeneratorCore.generateAvatar('my-special@project!');
            assert.ok(avatar.includes('<svg'), 'Should generate valid SVG despite special characters');
        });

        test('should handle empty project name', () => {
            const avatar = AvatarGeneratorCore.generateAvatar('');
            assert.ok(avatar.includes('<svg'), 'Should generate valid SVG for empty name');
        });

        test('should respect theme settings', () => {
            const lightTheme = { kind: 1 };
            const darkTheme = { kind: 2 };
            
            const lightAvatar = AvatarGeneratorCore.generateAvatar('test-project', lightTheme);
            const darkAvatar = AvatarGeneratorCore.generateAvatar('test-project', darkTheme);
            
            assert.ok(lightAvatar.includes('<svg'), 'Light theme should generate valid SVG');
            assert.ok(darkAvatar.includes('<svg'), 'Dark theme should generate valid SVG');
            // The avatars might be different due to theme-based color calculations
        });
    });

    suite('svgToDataUri', () => {
        test('should convert SVG to data URI', () => {
            const svg = '<svg width="100" height="100"><circle cx="50" cy="50" r="40"/></svg>';
            const dataUri = AvatarGeneratorCore.svgToDataUri(svg);
            assert.ok(dataUri.startsWith('data:image/svg+xml,'), 'Should start with SVG data URI prefix');
            assert.ok(dataUri.includes('%3Csvg'), 'Should include encoded SVG content');
        });

        test('should properly encode special characters', () => {
            const svg = '<svg><text>Special & chars</text></svg>';
            const dataUri = AvatarGeneratorCore.svgToDataUri(svg);
            assert.ok(dataUri.includes('%26'), 'Should encode ampersand');
        });
    });

    suite('generateAvatarDataUri', () => {
        test('should generate complete data URI for project', () => {
            const dataUri = AvatarGeneratorCore.generateAvatarDataUri('test-project');
            assert.ok(dataUri.startsWith('data:image/svg+xml,'), 'Should be a valid SVG data URI');
            assert.ok(dataUri.includes('%3Csvg'), 'Should contain encoded SVG');
        });

        test('should generate consistent data URI for same project', () => {
            const projectName = 'consistent-project';
            const dataUri1 = AvatarGeneratorCore.generateAvatarDataUri(projectName);
            const dataUri2 = AvatarGeneratorCore.generateAvatarDataUri(projectName);
            assert.strictEqual(dataUri1, dataUri2, 'Should generate consistent data URI');
        });

        test('should handle theme parameter', () => {
            const lightTheme = { kind: 1 };
            const dataUri = AvatarGeneratorCore.generateAvatarDataUri('test-project', lightTheme);
            assert.ok(dataUri.startsWith('data:image/svg+xml,'), 'Should generate valid data URI with theme');
        });
    });
});