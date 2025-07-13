const fs = require('fs').promises;
const path = require('path');
const { organizeFiles, undoLastAction, parseCommand } = require('./fileManager');

const TEST_DIR = './test_dir';

describe('fileManager', () => {
  beforeEach(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true });
    await fs.writeFile(path.join(TEST_DIR, 'file1.txt'), 'test1');
    await fs.writeFile(path.join(TEST_DIR, 'file2.txt'), 'test2');
  });

  afterEach(async () => {
    await fs.rm(TEST_DIR, { recursive: true, force: true });
  });

  test('organizeFiles should create a subfolder and move files', async () => {
    await organizeFiles(TEST_DIR, 'date');
    const files = await fs.readdir(TEST_DIR);
    const date = new Date();
    const subfolder = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    expect(files).toHaveLength(1);
    expect(files[0]).toBe(subfolder);

    const subfolderFiles = await fs.readdir(path.join(TEST_DIR, subfolder));
    expect(subfolderFiles).toHaveLength(2);
  });

  test('undoLastAction should restore the files', async () => {
    await organizeFiles(TEST_DIR, 'date');
    await undoLastAction();
    const files = await fs.readdir(TEST_DIR);
    expect(files).toHaveLength(2);
    expect(files).toContain('file1.txt');
    expect(files).toContain('file2.txt');
  });

  test('parseCommand should organize files based on natural language command', async () => {
    await parseCommand(`organize files in ${TEST_DIR} by date`);
    const files = await fs.readdir(TEST_DIR);
    const date = new Date();
    const subfolder = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    expect(files).toHaveLength(1);
    expect(files[0]).toBe(subfolder);

    const subfolderFiles = await fs.readdir(path.join(TEST_DIR, subfolder));
    expect(subfolderFiles).toHaveLength(2);
  });
});
