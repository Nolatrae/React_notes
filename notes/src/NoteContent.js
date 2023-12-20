import React from 'react';

const NoteContent = ({ selectedNote }) => {
  return (
    <div className="NoteContent col-md-8">
      {selectedNote && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{selectedNote.title}</h5>
            <p className="card-text">{selectedNote.content}</p>
            <p className="card-text">
              <strong>Приоритет:</strong> {selectedNote.priority}
            </p>
            <p className="card-text">
              <strong>Тэги:</strong> {selectedNote.tags.join(', ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteContent;
