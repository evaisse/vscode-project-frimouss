# Docker-Based Visual Testing (Optional)

This document describes the optional Docker-based testing approach for the Project Frimouss extension.

## Overview

While the `npm run generate-screenshots` command provides automated visual documentation, you can also test the extension in a real VSCode environment using Docker and code-server (VSCode in a browser).

## Prerequisites

- Docker installed and running
- Docker Compose (optional, for multi-project setup)

## Docker Setup

### Dockerfile

The `Dockerfile.test` provides a containerized VSCode environment:

```dockerfile
FROM codercom/code-server:latest
# Sets up a VSCode instance with the extension pre-installed
```

### Docker Compose

The `docker-compose.test.yml` orchestrates multiple VSCode instances:
- One for `project-alpha` on port 8081
- One for `project-beta` on port 8082

## Running Docker Tests

### Single Project

```bash
docker build -f Dockerfile.test -t vscode-frimouss-test .
docker run -p 8080:8080 -v $(pwd)/test-projects/project-alpha:/home/coder/workspace vscode-frimouss-test
```

Then open http://localhost:8080 in your browser.

### Multiple Projects

```bash
docker-compose -f docker-compose.test.yml up
```

This starts both test projects:
- project-alpha: http://localhost:8081
- project-beta: http://localhost:8082

## Manual Testing Checklist

When testing in the Docker environment:

- [ ] Extension appears in the Extensions sidebar
- [ ] Status bar shows project avatar icon
- [ ] Status bar shows correct project name
- [ ] Clicking status bar item opens avatar panel
- [ ] Avatar panel displays full-size avatar
- [ ] Avatar matches the project name
- [ ] "Show Project Avatar" command works
- [ ] "Refresh Project Avatar" command works
- [ ] Avatar changes when switching between light/dark themes

## Taking Screenshots

1. Open the browser DevTools (F12)
2. Use the device toolbar to set a consistent viewport
3. Use browser screenshot tools or extensions
4. Save screenshots to the `screenshots/` directory

## Limitations

- Docker-based testing requires network access to download code-server
- Extension installation in code-server may require manual steps
- May not perfectly replicate desktop VSCode behavior

## Alternative: Automated Screenshot Generation

For most use cases, the automated screenshot generation is recommended:

```bash
npm run generate-screenshots
```

This approach:
- ✅ Doesn't require Docker
- ✅ Runs in CI/CD environments
- ✅ Generates consistent output
- ✅ Creates interactive HTML previews
- ✅ Tests both themes automatically

## See Also

- [Visual Testing Documentation](VISUAL_TESTING.md)
- [code-server Documentation](https://github.com/coder/code-server)
