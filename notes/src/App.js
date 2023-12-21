import React, { useState, useEffect } from 'react';
import './App.css';
import AddNoteModal from './AddNoteModal';
import EditNoteModal from './EditNoteModal';
import NoteItem from './NoteItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(sessionStorage.getItem('notes')) || [];
    console.log('Loaded notes from sessionStorage:', storedNotes);
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('notes', JSON.stringify(notes));
    console.log('Saved notes to sessionStorage:', notes);
  }, [notes]);

  const openAddNoteModal = () => {
    setActiveModal('add');
    setSelectedNoteIndex(null);
  };

  const closeAddNoteModal = () => {
    setActiveModal(null);
  };

  const openEditNoteModal = (index) => {
    setActiveModal('edit');
    setSelectedNoteIndex(index);
  };

  const closeEditNoteModal = () => {
    setActiveModal(null);
    setSelectedNoteIndex(null);
  };

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, { ...newNote }]);
    setActiveModal(null);
  };

  const editNote = (editedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNoteIndex] = editedNote;
    setNotes(updatedNotes);
    setActiveModal(null);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    setActiveModal(null);
  };

  return (
    <>
      <div>
        <button className="btn btn-primary w-100" onClick={openAddNoteModal}>
          Добавить заметку
        </button>
      </div>
      <div className="mt-4 mx-4">
        <div className="cont row w-100">
          <div className="col-12">
            <ul className="list-group mt-3">
              {notes.map((note, index) => (
                <NoteItem
                  key={index}
                  note={note}
                  index={index}
                  onEdit={openEditNoteModal}
                  onDelete={deleteNote}
                />
              ))}
            </ul>
          </div>
        </div>
        {activeModal === 'add' && (
          <AddNoteModal isOpen={true} onRequestClose={closeAddNoteModal} onSave={addNote} />
        )}
        {activeModal === 'edit' && (
          <EditNoteModal
            isOpen={true}
            onRequestClose={closeEditNoteModal}
            onSave={editNote}
            note={selectedNoteIndex !== null ? notes[selectedNoteIndex] : null}
          />
        )}
      </div>
    </>
  );
};

export default App;
