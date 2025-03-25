// Just write to a file to verify Node.js is working
const fs = require('fs');
const path = require('path');

// Get absolute paths
const currentDir = __dirname;
const logPath = path.join(currentDir, 'test.log');

// Write file info first
fs.writeFileSync(logPath, `Current directory: ${currentDir}\n`);
fs.appendFileSync(logPath, 'Node.js is working\n');

// Try different output methods
process.stdout.write(`Writing to: ${logPath}\n`);
console.log('Console log output');
console.error('Error output');

// Exit explicitly
setTimeout(() => {
    console.log('Exiting...');
    process.exit(0);
}, 1000); 