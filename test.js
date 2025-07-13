const fs = require('fs').promises;
const path = require('path');
const { organizeFiles, undoLastAction } = require('./fileManager');

const TEST_DIR = './test_dir';

async function setup() {
  await fs.mkdir(TEST_DIR, { recursive: true });
  await fs.writeFile(path.join(TEST_DIR, 'file1.txt'), 'test1');
  await fs.writeFile(path.join(TEST_DIR, 'file2.txt'), 'test2');
}

async function cleanup() {
  await fs.rm(TEST_DIR, { recursive: true, force: true });
}

async function runTests() {
  await setup();

  try {
    // Test organizeFiles
    await organizeFiles(TEST_DIR, 'date');
    const files = await fs.readdir(TEST_DIR);
    const date = new Date();
    const subfolder = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (files.length !== 1 || files[0] !== subfolder) {
      console.error('Test failed: organizeFiles did not create the correct subfolder.');
      return;
    }

    const subfolderFiles = await fs.readdir(path.join(TEST_DIR, subfolder));
    if (subfolderFiles.length !== 2) {
      console.error('Test failed: organizeFiles did not move the files.');
      return;
    }
    console.log('Test passed: organizeFiles');

    // Test undoLastAction
    await undoLastAction();
    const undoneFiles = await fs.readdir(TEST_DIR);
    if (undoneFiles.length !== 2) {
      console.error('Test failed: undoLastAction did not restore the files.');
      return;
    }
    console.log('Test passed: undoLastAction');

  } finally {
    await cleanup();
  }
}

runTests();
