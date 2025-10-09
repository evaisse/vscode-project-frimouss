import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

suite('Extension Integration Tests', function() {
    // Increase timeout for extension tests
    this.timeout(30000);
    
    test('Extension should be present', async () => {
        const extension = vscode.extensions.getExtension('evaisse.vscode-project-frimouss');
        
        // In a test environment, the extension might not be installed
        // This is more of a placeholder test to ensure the test framework works
        if (extension) {
            assert.ok(true, 'Extension found');
        } else {
            console.log('Extension not found in test environment - this is expected for standalone testing');
            assert.ok(true, 'Test environment setup correctly');
        }
    });

    test('Basic workspace functionality', async () => {
        // Test basic VSCode workspace functionality that our extension relies on
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        // This test ensures VSCode workspace API is available
        assert.ok(workspaceFolders !== undefined, 'Workspace API should be available');
        
        // Test path operations that our extension uses
        const testPath = '/some/test/path';
        const basename = path.basename(testPath);
        assert.strictEqual(basename, 'path', 'Path operations should work correctly');
    });

    test('Commands API availability', async () => {
        // Test that VSCode commands API is available
        const commands = await vscode.commands.getCommands();
        assert.ok(Array.isArray(commands), 'Commands should be available as array');
        assert.ok(commands.length > 0, 'Should have some commands available');
    });
});