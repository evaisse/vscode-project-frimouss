# Project Frimouss - Visual Documentation

This directory contains automatically generated visual documentation of the Project Frimouss VSCode extension.

## 📸 Screenshots & Previews

The extension has been tested with 2 mock project workspaces, demonstrating the avatar generation functionality.

### Test Projects

- **project-alpha**: Generates unique avatar based on project name
- **project-beta**: Generates unique avatar based on project name

## 📁 Generated Files

### HTML Previews
- `index.html` - Main comparison page showing all projects (⭐ **Start here!**)
- `project-alpha-preview.html` - Interactive preview for project-alpha
- `project-beta-preview.html` - Interactive preview for project-beta

### SVG Assets
- `project-alpha-light-avatar.svg` - Light theme avatar for project-alpha
- `project-alpha-dark-avatar.svg` - Dark theme avatar for project-alpha
- `project-beta-light-avatar.svg` - Light theme avatar for project-beta
- `project-beta-dark-avatar.svg` - Dark theme avatar for project-beta

## 🎨 Features Demonstrated

✅ **Unique Avatar Generation** - Each project gets a distinct avatar based on its directory name
✅ **Consistent Output** - Same project name always produces the same avatar
✅ **Theme Support** - Automatic adaptation to light and dark VSCode themes
✅ **Scalable SVG** - Crisp rendering at any size (16px to 200px+)
✅ **Multi-layered Design** - Beautiful circular design with character overlays

## 🚀 How to View

1. **Main Comparison Page**: Open `index.html` in your web browser to see all projects side-by-side
2. **Individual Previews**: Open any `*-preview.html` file to see detailed views for a specific project
3. **Raw SVG Files**: The `.svg` files can be opened directly or embedded in other documents

## 🧪 Testing Details

- **Extension**: vscode-project-frimouss v0.0.1
- **Generated**: 2025-10-09T15:54:46.729Z
- **Test Method**: Automated screenshot generation using extension core
- **Themes Tested**: Light (kind: 1) and Dark (kind: 2)

## 🔄 Regenerating Documentation

To regenerate this visual documentation:

```bash
npm run compile
npm run generate-screenshots
```

## 📋 What This Demonstrates

This visual documentation proves that the extension:

1. **Works correctly** with different project names
2. **Generates consistent** avatars for the same input
3. **Adapts to themes** appropriately
4. **Scales properly** across different sizes
5. **Produces valid SVG** output

## 🎯 Extension Features

- **Status Bar Integration**: Shows project avatar in VSCode status bar
- **Click to View**: Opens detailed avatar panel
- **Refresh Command**: Regenerate avatar on demand
- **Theme-Aware**: Automatically adjusts colors based on VSCode theme
- **Character Extraction**: Uses meaningful characters from project name

---

*Generated automatically by the Project Frimouss visual testing suite*
