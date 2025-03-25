// 1. Basic output test
console.log('=== Basic Output Test ===');

// 2. Direct process.stdout test
process.stdout.write('Testing direct stdout write\n');

// 3. Error output test
console.error('Testing error output');

// 4. Synchronous file operation
const fs = require('fs');
fs.writeFileSync('test-output.txt', 'Test successful\n');

// 5. Force immediate flush
process.stdout.write('Test completed\n', () => {
    // Force exit after output
    process.exit(0);
}); 