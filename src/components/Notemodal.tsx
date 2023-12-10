import React, { useState, useEffect } from "react";
import "../styles/Notemodal.css";

interface NoteModalProps {
    selectedColor: string | null;
    closePopup: () => void;
    addToAllNotes: (currentNote: Note) => void;
    editedNote: Note | null;
}

interface Note {
    note_id: number;
    user_id: number;
    title: string;
    content: string;
    color: string;
    created_at: Date;
    updated_at: Date;
}
const NoteModal: React.FC<NoteModalProps> = ({
  selectedColor,
  closePopup,
  addToAllNotes,
  editedNote,
}) => {
    const [currentNote, setCurrentNote] = useState<{
        note_id: number;
        user_id: number;
        title: string;
        content: string;
        color: string;
        created_at: Date;
        updated_at: Date;
      }>({
        note_id: 0,
        user_id: 0,
        title: "",
        content: "",
        color: "",
        created_at: new Date(),
        updated_at: new Date(),
      });

  useEffect(() => {
    if (editedNote) {
      setCurrentNote(editedNote);
    }
  }, [editedNote]);

  const addTitleToNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNote({ ...currentNote, title: e.target.value });
  };

  const addBodyToNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNote({ ...currentNote, content: e.target.value });
  };

  const saveToAllNotes = () => {
    const newNote: Note = {
        title: currentNote.title,
        content: currentNote.content,
        color: selectedColor || "transparent",
        note_id: 0,
        user_id: 0,
        created_at: new Date(), 
        updated_at: new Date(), 
      };
    addToAllNotes(newNote);
    closePopup();
  };

  const colorBackgroundMap : Record<string, string> = {
    red: "#fe9b72",
    purple: "#b693fd",
    green: "#98fd32",
    sky: "#00d4fe",
    yellow: "#f0f644",
  };

  const backgroundColor = colorBackgroundMap[selectedColor||""] || "transparent";

  return (
    <div
      className="modal-container"
      style={{ color: "white", backgroundColor }}
    >
      <div className="modal">
        <h1 className="notemodal-title">
          Add Note
          <span className="close-btn" onClick={closePopup}>
            &times;
          </span>
        </h1>
        <input
          className="note-title"
          type="text"
          placeholder="Title"
          onChange={addTitleToNote}
        />
        <textarea
          className="note-body"
          cols={30}
          rows={10}
          style={{ height: "250px" }}
          placeholder="Take a note..."
          onChange={addBodyToNote}
        ></textarea>
        <br />
        <button className="save-btn" onClick={saveToAllNotes}>
          Save
        </button>
      </div>
    </div>
  );
}

export default NoteModal;