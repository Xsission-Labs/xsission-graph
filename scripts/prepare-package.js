// Script to prepare the package for publishing

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const ROOT_DIR = path.resolve(__dirname, '..');
const EXTENSION_DIR = path.join(ROOT_DIR, 'packages', 'extension');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Build all packages
console.log('Building all packages...');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: ROOT_DIR });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Create VSIX package
console.log('Creating VSIX package...');
try {
  execSync('npm run package', { stdio: 'inherit', cwd: ROOT_DIR });
  
  // Move VSIX file to dist directory
  const vsixFiles = fs.readdirSync(ROOT_DIR).filter(file => file.endsWith('.vsix'));
  if (vsixFiles.length > 0) {
    const vsixFile = vsixFiles[0];
    const oldPath = path.join(ROOT_DIR, vsixFile);
    const newPath = path.join(DIST_DIR, vsixFile);
    
    fs.renameSync(oldPath, newPath);
    console.log(`VSIX package moved to ${newPath}`);
  } else {
    console.error('No VSIX file found after packaging');
  }
} catch (error) {
  console.error('Packaging failed:', error);
  process.exit(1);
}

console.log('Package preparation completed successfully'); 