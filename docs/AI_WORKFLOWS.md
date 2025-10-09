# AI-Powered Workflows Documentation

This project uses AI-powered GitHub Actions workflows to automate issue handling, code review, and security scanning.

## Overview

The AI workflows in this project help automate:
- 🐛 Bug detection and analysis
- 🔍 Code review and quality checks
- 🏷️ Issue triage and categorization
- 💡 Development suggestions
- 🔒 Security vulnerability scanning

## Workflows

### 1. Copilot Autofix (`copilot-autofix.yml`)

**Purpose:** Automatically analyzes issues and PRs to detect problems and suggest fixes.

**Triggers:**
- New issues labeled with 'bug'
- Pull request creation or updates
- Manual workflow dispatch

**What it does:**
- Runs compilation checks
- Executes unit tests
- Identifies common issues
- Posts analysis with recommendations
- Suggests GitHub Copilot assistance

**Example output:**
```
🤖 Copilot Autofix Analysis

Issue Type: compilation

## Compilation Output
[compilation errors]

### Recommendations
- Review TypeScript compilation errors
- Check for missing type definitions
- Verify imports and dependencies
```

### 2. AI Code Review (`ai-code-review.yml`)

**Purpose:** Provides automated code review for all pull requests.

**Triggers:**
- Pull request opened, synchronized, or reopened
- Manual workflow dispatch

**What it does:**
- Analyzes changed files
- Counts TypeScript and test changes
- Checks compilation status
- Provides recommendations
- Lists all changed files

**Best practices:**
- Review the AI suggestions before merging
- Add tests when TypeScript files change
- Address compilation issues before requesting human review

### 3. AI Issue Triage (`ai-issue-triage.yml`)

**Purpose:** Automatically categorizes and labels new issues.

**Triggers:**
- New issue creation
- Manual workflow dispatch

**What it does:**
- Analyzes issue title and body
- Detects issue type (bug, feature, documentation, etc.)
- Assigns priority (high, medium, low)
- Adds relevant labels
- Posts categorization comment
- Provides category-specific checklists

**Detected categories:**
- 🐛 Bug reports
- ✨ Feature requests
- 📚 Documentation
- 🧪 Testing
- ⚙️ CI/CD
- ⚡ Performance
- 🔒 Security
- 🤖 AI-related

**Auto-assigned labels:**
- `bug`, `enhancement`, `documentation`
- `testing`, `ci/cd`, `performance`
- `security`, `ai-related`
- `priority: high`, `priority: low`

### 4. AI PR Review Assistant (`ai-pr-assistant.yml`)

**Purpose:** Comprehensive PR analysis with actionable suggestions.

**Triggers:**
- Pull request creation or updates
- Review comments
- Manual workflow dispatch

**What it does:**
- Checks compilation and test status
- Counts TODO/FIXME comments
- Detects debug code (console.log)
- Provides AI usage tips
- Uploads analysis artifacts

**Checks performed:**
- ✅ Compilation status
- ✅ Test execution
- 📝 TODO/FIXME tracking
- 🐛 Debug statement detection

### 5. AI Security Scanner (`ai-security-scanner.yml`)

**Purpose:** Regular security and dependency scanning.

**Triggers:**
- Push to main/master branch
- Pull requests
- Weekly schedule (Mondays at 9 AM UTC)
- Manual workflow dispatch

**What it does:**
- Runs npm audit for vulnerabilities
- Checks for outdated dependencies
- Verifies TypeScript strict mode compliance
- Creates security issues (on schedule)
- Posts security reports on PRs
- Uploads security artifacts

**Security checks:**
- 🔒 Vulnerability scanning
- 📦 Outdated dependency detection
- 🔧 TypeScript strict mode compliance
- 📊 Dependency analysis

## Using AI Assistance

### GitHub Copilot Integration

All workflows are designed to work with GitHub Copilot. Here's how to get the most out of AI assistance:

#### In VSCode
1. **Enable Copilot**: Install the GitHub Copilot extension
2. **Use Copilot Chat**: Press `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)
3. **Ask workspace questions**:
   ```
   @workspace How can I fix the compilation errors?
   @workspace What tests should I add for this code?
   @workspace Are there security issues in my code?
   @workspace How do I update dependency X safely?
   ```

#### Copilot Chat Commands
- `@workspace Explain this code` - Get explanations
- `@workspace Fix this issue` - Get fix suggestions
- `@workspace Write tests for this` - Generate tests
- `@workspace Improve this code` - Get refactoring ideas
- `@workspace Check for bugs` - Find potential issues

### Workflow Automation

#### For Maintainers

**When an issue is created:**
1. AI automatically labels and categorizes it
2. Review the AI triage comment
3. Adjust labels if needed
4. Respond with additional context

**When a PR is opened:**
1. AI analyzes code changes
2. Review AI suggestions
3. Use Copilot to implement fixes
4. Respond to security warnings

**Weekly security scan:**
1. Check for new security issues
2. Review vulnerability reports
3. Use Copilot to plan updates
4. Create PRs for fixes

#### For Contributors

**Before creating a PR:**
1. Run `npm run compile` locally
2. Run `npm run test-unit` locally
3. Fix any issues found
4. Use Copilot for help with fixes

**After creating a PR:**
1. Review AI analysis comments
2. Address any warnings
3. Add tests if suggested
4. Remove debug code if detected
5. Use Copilot for improvements

## Configuration

### Required Permissions

The workflows require these GitHub permissions:
- `contents: write` - For Copilot Autofix
- `issues: write` - For issue triage and security issues
- `pull-requests: write` - For PR comments
- `security-events: write` - For security scanning

### Adding Custom Labels

To use all AI triage features, create these labels in your repository:
- `bug`, `enhancement`, `documentation`
- `testing`, `ci/cd`, `performance`
- `security`, `ai-related`
- `priority: high`, `priority: low`
- `automated`, `dependencies`

### Customization

You can customize the workflows by editing the YAML files in `.github/workflows/`:

**Example: Change security scan schedule**
```yaml
schedule:
  - cron: '0 9 * * 1'  # Change to your preferred time
```

**Example: Add more issue labels**
```javascript
// In ai-issue-triage.yml
if (title.includes('refactor') || body.includes('refactor')) {
  labels.push('refactoring');
}
```

## Troubleshooting

### Workflow not running

**Check:**
1. Workflow file syntax (YAML)
2. Permissions in repository settings
3. Branch protection rules
4. GitHub Actions enabled

### AI analysis incomplete

**Check:**
1. Node.js version compatibility
2. Dependency installation success
3. Compilation errors
4. Workflow logs in Actions tab

### Labels not applied

**Possible causes:**
1. Labels don't exist in repository
2. Insufficient permissions
3. Label name mismatch

**Solution:** Create missing labels or check permissions

## Best Practices

### For Maximum AI Benefit

1. **Write clear issue descriptions**
   - Include error messages
   - Describe expected behavior
   - Provide reproduction steps

2. **Use descriptive PR titles**
   - Start with type: `fix:`, `feat:`, `docs:`
   - Be specific about changes

3. **Keep PRs focused**
   - One feature/fix per PR
   - Easier for AI to analyze
   - Better suggestions

4. **Review AI suggestions**
   - Don't blindly accept
   - Understand the recommendations
   - Ask Copilot for explanations

5. **Address security warnings**
   - Act on vulnerability reports
   - Update dependencies regularly
   - Use Copilot for safe updates

### Continuous Improvement

- Review AI accuracy periodically
- Adjust workflows based on feedback
- Share successful patterns
- Report AI misclassifications
- Contribute workflow improvements

## Examples

### Example 1: Bug Report Flow

1. User creates issue: "Extension crashes when opening large files"
2. AI Triage detects: bug, assigns labels
3. AI posts checklist for bug reports
4. Developer uses Copilot: `@workspace Why might this crash?`
5. Developer creates PR with fix
6. AI Code Review analyzes changes
7. AI PR Assistant checks for tests
8. PR merged with AI approval

### Example 2: Feature Request Flow

1. User creates issue: "Add dark mode support"
2. AI Triage detects: enhancement
3. AI posts feature request checklist
4. Developer uses Copilot: `@workspace How to implement dark mode?`
5. Developer creates PR
6. AI reviews code changes
7. Security scanner checks dependencies
8. PR merged after review

### Example 3: Security Issue Flow

1. Weekly security scan runs
2. Vulnerability detected
3. AI creates security issue
4. Developer uses Copilot: `@workspace How to update package safely?`
5. Developer creates update PR
6. AI verifies no new vulnerabilities
7. PR merged after testing

## Support

For issues with AI workflows:
1. Check workflow logs in Actions tab
2. Review this documentation
3. Ask in GitHub Discussions
4. Use `@workspace` in Copilot Chat
5. Create an issue with label `ci/cd`

## Future Enhancements

Planned improvements:
- Integration with more AI tools
- Advanced code pattern detection
- Automated PR creation for fixes
- Enhanced security scanning
- Performance analysis
- Code coverage tracking

## Contributing

To improve AI workflows:
1. Test current workflows
2. Identify gaps or issues
3. Propose improvements
4. Submit PRs with changes
5. Document new features

---

*Last updated: 2024*
*AI workflows are continuously evolving to better serve the project.*
