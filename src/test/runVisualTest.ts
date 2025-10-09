import * as path from 'path';
import * as fs from 'fs';
import { runTests } from '@vscode/test-electron';

/**
 * Visual test runner for the Project Frimouss extension
 * This test will:
 * 1. Launch VSCode with the extension
 * 2. Open test project workspaces
 * 3. Capture visual evidence of the extension working
 */
async function runVisualTests() {
    try {
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');
        const extensionTestsPath = path.resolve(__dirname, './visual/visualTests');
        
        // Test with project-alpha
        console.log('\n=== Testing with project-alpha ===');
        const projectAlphaPath = path.resolve(__dirname, '../../test-projects/project-alpha');
        
        if (!fs.existsSync(projectAlphaPath)) {
            throw new Error(`Test project not found: ${projectAlphaPath}`);
        }
        
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: [
                projectAlphaPath,
                '--disable-extensions', // Disable other extensions
                '--skip-welcome',
                '--skip-release-notes'
            ]
        });
        
        console.log('✓ project-alpha tests completed');
        
        // Test with project-beta
        console.log('\n=== Testing with project-beta ===');
        const projectBetaPath = path.resolve(__dirname, '../../test-projects/project-beta');
        
        if (!fs.existsSync(projectBetaPath)) {
            throw new Error(`Test project not found: ${projectBetaPath}`);
        }
        
        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: [
                projectBetaPath,
                '--disable-extensions',
                '--skip-welcome',
                '--skip-release-notes'
            ]
        });
        
        console.log('✓ project-beta tests completed');
        
        console.log('\n=== All visual tests completed successfully ===');
        
    } catch (err) {
        console.error('Visual tests failed:', err);
        process.exit(1);
    }
}

runVisualTests();
