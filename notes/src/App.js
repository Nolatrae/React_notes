import React, { useState } from 'react';
import './App.css';
import NoteContent from './NoteContent';
import AddNoteModal from './AddNoteModal';
import NoteItem from './NoteItem';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  // Save notes to localStorage whenever the 'notes' state changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const openAddNoteModal = () => {
    setIsAddNoteModalOpen(true);
  };

  const closeAddNoteModal = () => {
    setIsAddNoteModalOpen(false);
  };

  const addNote = (newNote) => {
    setNotes([...notes, { ...newNote }]);
    setSelectedNoteIndex(null);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    setSelectedNoteIndex(null);
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
        <div className="col-12 col-md-4">
        <ul className="list-group mt-3">
          {notes.map((note, index) => (
            <NoteItem
              key={index}
              note={note}
              index={index}
              onEdit={setSelectedNoteIndex}
              onDelete={deleteNote}
            />
          ))}
        </ul>
      </div>
        <NoteContent className="col-md-8 col-12" selectedNote={selectedNoteIndex !== null ? notes[selectedNoteIndex] : null} />
        </div>
        <AddNoteModal isOpen={isAddNoteModalOpen} onRequestClose={closeAddNoteModal} onSave={addNote} />
      </div>
    </>
  );
};

export default App;
