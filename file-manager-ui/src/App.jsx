import React from 'react';
import FileBrowser from './components/FileBrowser';
import CommandBar from './components/CommandBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <FileBrowser />
      <CommandBar />
    </div>
  );
}

export default App;
