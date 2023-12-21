import React, { useState } from 'react';
import Modal from 'react-modal';

const predefinedTags = ['Дом', 'Работа', 'Учёба', 'Отдых', 'Хобби'];
const noteTypes = ['Работа', 'Личное', 'Покупки', 'Другое'];

const AddNoteModal = ({ isOpen, onRequestClose, onSave }) => {
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    priority: 'Низкий',
    tags: [],
    isUrgent: false,
    noteType: 'Другое',
  });
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((prevTag) => prevTag !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  const handleUrgentChange = () => {
    setNewNote((prevNote) => ({ ...prevNote, isUrgent: !prevNote.isUrgent }));
  };

  const handleNoteTypeChange = (type) => {
    setNewNote((prevNote) => ({ ...prevNote, noteType: type }));
  };

  const handleSave = () => {
    onSave({
      ...newNote,
      tags: selectedTags,
    });
    setNewNote({
      title: '',
      content: '',
      priority: 'Низкий',
      tags: [],
      isUrgent: false,
      noteType: 'Другое',
    });
    setSelectedTags([]);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Добавить заметку"
      className="Modal"
      overlayClassName="Overlay"
      appElement={document.getElementById('root')}
    >
      <div className="container mt-4 mb-4">
        <h2 className="mb-4">Добавить заметку</h2>
        <div className="form-group">
          <label htmlFor="title">Название:</label>
          <input
            required
            type="text"
            className="form-control"
            id="title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Содержание:</label>
          <textarea
            required
            className="form-control"
            id="content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Приоритет:</label>
          <select
            className="form-control"
            id="priority"
            value={newNote.priority}
            onChange={(e) => setNewNote({ ...newNote, priority: e.target.value })}
          >
            <option value="Низкий">Низкий</option>
            <option value="Средний">Средний</option>
            <option value="Высокий">Высокий</option>
          </select>
        </div>
        <div className="form-group">
          <label>Тэги:</label>
          <div className="btn-group">
            {predefinedTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`btn btn-outline-primary ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
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
            checked={newNote.isUrgent}
            onChange={handleUrgentChange}
          />
        </div>
        <div className="form-group">
          <label>Тип заметки:</label>
          {noteTypes.map((type) => (
            <div key={type} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={type}
                value={type}
                checked={newNote.noteType === type}
                onChange={() => handleNoteTypeChange(type)}
              />
              <label className="form-check-label" htmlFor={type}>
                {type}
              </label>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          Сохранить
        </button>
      </div>
    </Modal>
  );
};

export default AddNoteModal;
