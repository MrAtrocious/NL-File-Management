const fs = require('fs').promises;
const path = require('path');

/**
 * @typedef {Object} FileOperation
 * @property {string} type - The type of operation (e.g., 'move').
 * @property {string} from - The source path of the file.
 * @property {string} to - The destination path of the file.
 */

/**
 * @type {FileOperation[]}
 */
const actionLog = [];

/**
 * Organizes files in a directory based on a given criteria.
 *
 * @param {string} directory - The directory to organize.
 * @param {string} criteria - The criteria for organizing files (e.g., 'date').
 */
async function organizeFiles(directory, criteria) {
  try {
    const files = await fs.readdir(directory);
    const log = [];

    for (const file of files) {
      const fromPath = path.join(directory, file);
      const stats = await fs.stat(fromPath);

      if (stats.isFile()) {
        const date = stats.birthtime;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const subfolder = `${year}-${month}-${day}`;
        const toPathDir = path.join(directory, subfolder);

        await fs.mkdir(toPathDir, { recursive: true });
        const toPath = path.join(toPathDir, file);
        await fs.rename(fromPath, toPath);

        log.push({ type: 'move', from: fromPath, to: toPath });
      }
    }

    if (log.length > 0) {
      actionLog.push(log);
    }
  } catch (error) {
    console.error('Error organizing files:', error);
  }
}

/**
 * Undoes the last file operation.
 */
async function undoLastAction() {
  const lastAction = actionLog.pop();

  if (lastAction) {
    try {
      for (const op of lastAction.reverse()) {
        if (op.type === 'move') {
          await fs.rename(op.to, op.from);
          // Check if the directory is empty after moving the file
          const dir = path.dirname(op.to);
          const files = await fs.readdir(dir);
          if (files.length === 0) {
            await fs.rmdir(dir);
          }
        }
      }
      console.log('Last action undone.');
    } catch (error) {
      console.error('Error undoing last action:', error);
      actionLog.push(lastAction);
    }
  } else {
    console.log('No actions to undo.');
  }
}

/**
 * Parses a natural language command and executes the corresponding action.
 *
 * @param {string} command - The natural language command.
 */
async function parseCommand(command) {
  const organizeRegex = /organize files in (.+) by (.+)/;
  const match = command.match(organizeRegex);

  if (match) {
    const [, directory, criteria] = match;
    await organizeFiles(directory, criteria);
  } else {
    console.log('Unknown command.');
  }
}

module.exports = {
  organizeFiles,
  undoLastAction,
  parseCommand,
};
