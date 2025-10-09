import * as path from 'path';
import * as Mocha from 'mocha';
import * as fs from 'fs';

export function run(): Promise<void> {
    const mocha = new Mocha({
        ui: 'tdd',
        color: true,
        timeout: 60000 // Longer timeout for visual tests
    });

    const testsRoot = path.resolve(__dirname, '..');

    return new Promise((resolve, reject) => {
        try {
            const visualTestPath = path.resolve(testsRoot, 'visual/extension.visual.test.js');
            if (fs.existsSync(visualTestPath)) {
                mocha.addFile(visualTestPath);
            }

            mocha.run(failures => {
                if (failures > 0) {
                    reject(new Error(`${failures} visual tests failed.`));
                } else {
                    resolve();
                }
            });
        } catch (err) {
            console.error('Error loading visual tests:', err);
            reject(err);
        }
    });
}
