# Visual Testing Documentation

This document describes the visual testing setup for the Project Frimouss VSCode extension.

## Overview

The visual testing infrastructure allows us to verify that the extension correctly generates avatars for different projects and themes without requiring a full VSCode instance or manual testing.

## Test Projects

Two mock projects are used for visual testing:

- **project-alpha**: Located in `test-projects/project-alpha/`
- **project-beta**: Located in `test-projects/project-beta/`

Each project contains minimal files (README.md and index.js) to simulate a real workspace.

## Screenshot Generation

### Automated Generation

The `npm run generate-screenshots` command automatically:

1. Compiles the TypeScript code
2. Generates avatars for both test projects in light and dark themes
3. Creates SVG files for each avatar variant
4. Generates interactive HTML previews
5. Creates a comparison page showing all avatars side-by-side

### Output Files

All generated files are saved to the `screenshots/` directory:

```
screenshots/
├── index.html                          # Main comparison page
├── project-alpha-preview.html          # Individual preview for project-alpha
├── project-beta-preview.html           # Individual preview for project-beta
├── project-alpha-light-avatar.svg      # Light theme SVG
├── project-alpha-dark-avatar.svg       # Dark theme SVG
├── project-beta-light-avatar.svg       # Light theme SVG
├── project-beta-dark-avatar.svg        # Dark theme SVG
└── README.md                           # Documentation
```

## Running Visual Tests

### Generate Screenshots

```bash
npm run generate-screenshots
```

This will:
- Compile the extension code
- Generate all avatar variants
- Create HTML previews
- Output a summary to the console

### View Results

Open `screenshots/index.html` in a web browser to see:
- Side-by-side comparison of both projects
- Light and dark theme variants
- Multiple size demonstrations (16px, 32px, 48px, 150px)

## Integration with CI/CD

The visual tests can be integrated into GitHub Actions workflows:

```yaml
- name: Generate Visual Documentation
  run: npm run generate-screenshots

- name: Upload Screenshots
  uses: actions/upload-artifact@v4
  with:
    name: visual-documentation
    path: screenshots/
```

## What is Tested

The visual tests verify:

1. **Avatar Generation**: Avatars are correctly generated from project names
2. **Consistency**: Same project name produces the same avatar
3. **Theme Support**: Both light and dark themes are properly handled
4. **Scalability**: SVG avatars render correctly at multiple sizes
5. **Character Extraction**: Characters are correctly extracted from project names

## Technical Details

### Screenshot Generator Script

The main script (`scripts/generate-screenshots.js`) uses:
- `AvatarGeneratorCore`: Core avatar generation logic
- Node.js `fs` module: File system operations
- Template functions: Generate HTML from avatar data

### Theme Configuration

Themes are defined as:
- Light theme: `{ kind: 1 }`
- Dark theme: `{ kind: 2 }`

These mirror the VSCode `ColorThemeKind` enum values.

### HTML Preview Features

The generated HTML previews include:
- Responsive design
- Theme-specific styling
- Multiple size demonstrations
- Feature highlights
- Accessibility considerations

## Troubleshooting

### "Cannot find module" Error

Ensure you've compiled the TypeScript code first:
```bash
npm run compile
```

### Empty or Missing Screenshots

Check that:
1. The `out/` directory exists and contains compiled JavaScript
2. The `test-projects/` directory exists with both mock projects
3. You have write permissions to create the `screenshots/` directory

### Browser Display Issues

If SVGs don't display correctly:
1. Ensure you're viewing the HTML files via a web server (not `file://` protocol)
2. Check browser console for any errors
3. Verify SVG content is properly embedded in the HTML

## Future Enhancements

Potential improvements to the visual testing infrastructure:

- [ ] Add more test projects with different naming patterns
- [ ] Include edge cases (special characters, very long names, etc.)
- [ ] Generate PNG screenshots alongside HTML for easier viewing in GitHub
- [ ] Add visual regression testing to detect unintended changes
- [ ] Create animated demos showing the extension in action
- [ ] Add accessibility testing for generated avatars

## Related Files

- `scripts/generate-screenshots.js`: Main screenshot generation script
- `src/avatarGeneratorCore.ts`: Core avatar generation logic
- `test-projects/`: Mock project directories
- `screenshots/`: Generated visual documentation
- `package.json`: Contains the `generate-screenshots` npm script
