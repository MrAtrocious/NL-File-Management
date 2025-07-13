import React, { useState } from 'react';

const CommandBar = ({ onCommand }) => {
  const [command, setCommand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (command.trim()) {
      onCommand(command);
      setCommand('');
    }
  };

  return (
    <form className="command-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What would you like to do?"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />
      <button type="submit">🎤</button>
    </form>
  );
};

export default CommandBar;
