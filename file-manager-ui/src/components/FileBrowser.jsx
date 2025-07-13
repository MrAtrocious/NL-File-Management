import React from 'react';

const files = [
  { id: 1, name: 'file1.txt', type: 'file' },
  { id: 2, name: 'file2.txt', type: 'file' },
  { id: 3, name: 'folder1', type: 'folder' },
];

const FileBrowser = () => {
  return (
    <div className="file-browser">
      {files.map(file => (
        <div key={file.id} className="file-item">
          <div className="file-icon">{file.type === 'file' ? '📄' : '📁'}</div>
          <div className="file-name">{file.name}</div>
        </div>
      ))}
    </div>
  );
};

export default FileBrowser;
