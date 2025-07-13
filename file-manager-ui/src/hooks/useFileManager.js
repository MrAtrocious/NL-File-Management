import { useState, useCallback } from 'react';
import { organizeFiles, undoLastAction, parseCommand } from '../fileManager';

export const useFileManager = () => {
  const [error, setError] = useState(null);

  const handleAsyncAction = async (action) => {
    try {
      setError(null);
      await action();
    } catch (e) {
      setError(e.message);
    }
  };

  const organize = useCallback(async (directory, criteria) => {
    await handleAsyncAction(() => organizeFiles(directory, criteria));
  }, []);

  const undo = useCallback(async () => {
    await handleAsyncAction(undoLastAction);
  }, []);

  const parse = useCallback(async (command) => {
    await handleAsyncAction(() => parseCommand(command));
  }, []);

  return { organize, undo, parse, error };
};
