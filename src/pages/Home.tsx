import { useState} from "react";
import { FaSearch } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";
import "../styles/Home.css";
import SideBar from "../components/Sidebar";

interface Note {
    note_id: number;
    user_id: number;
    title: string;
    content: string;
    color: string;
    created_at: Date;
    updated_at: Date;
  }

export default function Home() {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedNote, setEditedNote] = useState<Note | null>(null);

  const addToAllNotes = (currentNote: Note) => {
    if(editedNote){
        const updatedNote = allNotes.map((note) => {
            return note===editedNote ? currentNote : note
        });
        setAllNotes(updatedNote);
        setEditedNote(null);
    }else{
        setAllNotes([...allNotes, currentNote]);
    }
  };

  const openPopup = (color: string) => {
    setSelectedColor(color);
    setIsModalOpen(true);
  };

  const closePopup = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (note: Note) => {
    setEditedNote(note);
    openPopup(note.color);
  }

  const handleDelete = (note: Note) => {
    const filteredNotes = allNotes.filter((n) => n !== note);
    setAllNotes(filteredNotes);
  };

  const colorBackgroundMap: Record<string, string> = {
    red: "#fe9b72",
    purple: "#b693fd",
    green: "#98fd32",
    sky: "#00d4fe",
    yellow: "#f0f644",
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">SyncScribe</h1>
        <div className="navbar">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input className="search-bar" type="search" placeholder="Search" />
          </div>
          <div className="profile-container">
            <IoPerson className="profile-icon" />
          </div>
        </div>
      </div>
      <div className="body-container">
        <div className="side-bar">
          <SideBar
            selectedColor={selectedColor}
            openPopup={openPopup}
            closePopup={closePopup}
            isModalOpen={isModalOpen}
            addToAllNotes={addToAllNotes}
            editedNote={editedNote}
          />
        </div>
        <div className="main-body">
          <div className="card-view">
            {allNotes.map((note, index) => (
              <div
                key={index}
                className="all-note-card"
                style={{ backgroundColor: colorBackgroundMap[note.color as keyof typeof colorBackgroundMap] }}
              >
                <h1 className="all-note-title">{note.title}</h1>
                <p className="all-note-body">{note.content}</p>
                <button className="edit-btn" onClick={() => handleEdit(note)}>
                  <MdEdit className="edit-btn-icon" />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(note)}
                >
                  <MdDelete className="delete-btn-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
