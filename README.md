# Project Frimouss - VSCode Extension

A VSCode extension that displays a unique, beautiful avatar/badge for your current project based on the directory name.

## Features

- **Unique Project Avatars**: Generates a distinctive circular avatar for each project based on its directory name
- **Consistent Generation**: Same project name always produces the same avatar 
- **Theme-Aware**: Colors adapt to your current VSCode color theme (light/dark)
- **Beautiful Design**: Multi-layered circular design with gradient backgrounds and character overlays
- **Status Bar Integration**: Shows project name in the status bar with click-to-view functionality

## How It Works

The extension extracts the basename of your current workspace directory and generates a unique avatar using:

- **Character Extraction**: Takes key characters from the project name (first, second, and last)
- **Color Generation**: Creates consistent colors using a hash algorithm based on the project name
- **Layered Design**: Superimposes multiple character elements of different sizes and opacities
- **Theme Integration**: Adapts colors to match your current VSCode theme

## Usage

1. Open any folder/workspace in VSCode
2. Look for the project name in the status bar (left side) with a colorful icon
3. Click on the status bar item to view the full avatar in a dedicated panel
4. Use the command "Project Frimouss: Show Project Avatar" to open the avatar panel
5. Use the command "Project Frimouss: Refresh Project Avatar" to regenerate the avatar

## Commands

- `Project Frimouss: Show Project Avatar` - Opens a panel displaying the project avatar
- `Project Frimouss: Refresh Project Avatar` - Refreshes the avatar (useful after theme changes)

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies  
3. Run `npm run compile` to build the extension
4. Press F5 to open a new VSCode window with the extension loaded

## Development

- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for file changes and recompile automatically
- Press F5 in VSCode to launch a new Extension Development Host window

## Testing

The extension includes comprehensive testing with GitHub CI integration:

### Running Tests

- `npm run test-unit` - Run unit tests (fast, no VSCode dependency)
- `npm run test-all` - Run all unit tests with summary
- `npm test` - Run integration tests (requires VSCode environment)

### Test Structure

- **Unit Tests** (`src/test/unit/`): Test core avatar generation logic without VSCode dependencies
- **Integration Tests** (`src/test/integration/`): Test extension functionality within VSCode environment

### Continuous Integration

The project uses GitHub Actions for automated testing:
- Tests run on Node.js 18.x and 20.x
- Unit tests validate core functionality
- TypeScript compilation is verified
- Extension packaging is tested
- Artifacts are uploaded for releases

## License

MIT License - see LICENSE file for details.
