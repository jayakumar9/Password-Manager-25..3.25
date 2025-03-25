// Simple test to verify basic Node.js functionality
console.log('Basic test starting...');

// Test basic file system operations
const fs = require('fs');
const path = require('path');

// Test synchronous operations
try {
    // 1. Test console.log
    console.log('Step 1: Testing console.log');
    
    // 2. Test file system
    const currentDir = __dirname;
    console.log('Step 2: Current directory:', currentDir);
    
    // 3. Test file reading
    const files = fs.readdirSync(currentDir);
    console.log('Step 3: Files in directory:', files);
    
    // 4. Test environment
    console.log('Step 4: NODE_ENV:', process.env.NODE_ENV);
    
    // 5. Force an error to test error handling
    console.log('Step 5: Testing error handling');
    // Uncomment to test error handling:
    // throw new Error('Test error');
    
} catch (error) {
    console.error('Error in test:', error);
}

console.log('Basic test completed'); 