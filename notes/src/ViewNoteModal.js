import React from 'react';
import Modal from 'react-modal';

const ViewNoteModal = ({ isOpen, onRequestClose, note }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Просмотр заметки"
      className="Modal"
      overlayClassName="Overlay"
      appElement={document.getElementById('root')}
    >
      <div className="container mt-4 mb-4">
        <h2 className="mb-4">Просмотр заметки</h2>
        <div>
          <strong>Название:</strong> {note.title}
        </div>
        <div>
          <strong>Содержание:</strong> {note.content}
        </div>
        <div>
          <strong>Приоритет:</strong> {note.priority}
        </div>
        <div>
          <strong>Тэги:</strong> {note.tags.join(', ')}
        </div>
        <div>
          <strong>Срочная:</strong> {note.isUrgent ? 'Да' : 'Нет'}
        </div>
        <div>
          <strong>Тип заметки:</strong> {note.noteType}
        </div>
        <button className="btn btn-primary" onClick={onRequestClose}>
          Закрыть
        </button>
      </div>
    </Modal>
  );
};

export default ViewNoteModal;
