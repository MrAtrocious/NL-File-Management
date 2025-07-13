import React from 'react';

const FileBrowser = ({ files }) => {
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
