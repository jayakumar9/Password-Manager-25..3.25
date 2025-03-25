// Basic console log test
process.stdout.write('Starting test...\n');

try {
    // Test file system
    const fs = require('fs');
    const path = require('path');
    process.stdout.write('Modules loaded\n');

    // Test path
    const envPath = path.join(__dirname, '../.env');
    process.stdout.write(`ENV path: ${envPath}\n`);

    // Test file existence
    const exists = fs.existsSync(envPath);
    process.stdout.write(`ENV file exists: ${exists}\n`);

    // Test file reading
    if (exists) {
        const content = fs.readFileSync(envPath, 'utf8');
        process.stdout.write('ENV content:\n' + content + '\n');
    }

    // Test dotenv
    require('dotenv').config({ path: envPath });
    process.stdout.write(`PORT from env: ${process.env.PORT}\n`);

} catch (e) {
    process.stderr.write(`Error: ${e.message}\n`);
    process.stderr.write(e.stack + '\n');
}

process.stdout.write('Test completed\n'); 