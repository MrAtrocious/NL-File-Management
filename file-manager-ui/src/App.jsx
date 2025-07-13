import React, { useState, useEffect } from 'react';
import FileBrowser from './components/FileBrowser';
import CommandBar from './components/CommandBar';
import { useFileManager } from './hooks/useFileManager';
import './App.css';

function App() {
  const { organize, undo, parse, error } = useFileManager();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this from a server
    setFiles([
      { id: 1, name: 'file1.txt', type: 'file' },
      { id: 2, name: 'file2.txt', type: 'file' },
    ]);
  }, []);

  return (
    <div className="App">
      <FileBrowser files={files} />
      <CommandBar onCommand={parse} />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
