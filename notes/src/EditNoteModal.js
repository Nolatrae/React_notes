import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const categories = ['Работа', 'Личное', 'Покупки', 'Другое'];
const predefinedTags = ['Дом', 'Работа', 'Учёба', 'Отдых', 'Хобби'];
const noteTypes = ['Работа', 'Личное', 'Покупки', 'Другое'];

const EditNoteModal = ({ isOpen, onRequestClose, onSave, note }) => {
  const [editedNote, setEditedNote] = useState(note);

  useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const handleSave = () => {
    onSave(editedNote);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Редактирование заметки"
      className="Modal"
      overlayClassName="Overlay"
      appElement={document.getElementById('root')}
    >
      <div className="container mt-4 mb-4">
        <h2 className="mb-4">Редактирование заметки</h2>
        {editedNote ? (
          <>
            <div className="form-group">
              <label htmlFor="editedTitle">Название:</label>
              <input
                type="text"
                className="form-control"
                id="editedTitle"
                value={editedNote.title}
                onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editedContent">Содержание:</label>
              <textarea
                className="form-control"
                id="editedContent"
                value={editedNote.content}
                onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editedCategory">Категория:</label>
              <select
                className="form-control"
                id="editedCategory"
                value={editedNote.category}
                onChange={(e) => setEditedNote({ ...editedNote, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Тэги:</label>
              <div className="btn-group">
                {predefinedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`btn btn-outline-primary ${editedNote.tags.includes(tag) ? 'active' : ''}`}
                    onClick={() =>
                      setEditedNote((prevNote) => ({
                        ...prevNote,
                        tags: prevNote.tags.includes(tag)
                          ? prevNote.tags.filter((prevTag) => prevTag !== tag)
                          : [...prevNote.tags, tag],
                      }))
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="mr-2">Срочная:</label>
              <input
                type="checkbox"
                checked={editedNote.isUrgent}
                onChange={() => setEditedNote((prevNote) => ({ ...prevNote, isUrgent: !prevNote.isUrgent }))}
              />
            </div>
            <div className="form-group">
              <label>Тип заметки:</label>
              {noteTypes.map((type) => (
                <div key={type} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`editedNoteType-${type}`}
                    value={type}
                    checked={editedNote.noteType === type}
                    onChange={() => setEditedNote((prevNote) => ({ ...prevNote, noteType: type }))}
                  />
                  <label className="form-check-label" htmlFor={`editedNoteType-${type}`}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" onClick={handleSave}>
              Сохранить
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <button className="btn btn-secondary ms-2" onClick={onRequestClose}>
          Отмена
        </button>
      </div>
    </Modal>
  );
};

export default EditNoteModal;
