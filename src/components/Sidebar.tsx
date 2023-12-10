import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import NoteModal from "./Notemodal";
import "../styles/Sidebar.css";

interface SideBarProps {
    selectedColor: string | null;
    openPopup: (color: string) => void;
    closePopup: () => void;
    isModalOpen: boolean;
    addToAllNotes: (currentNote: any) => void;
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

const SideBar: React.FC<SideBarProps> = ({
    selectedColor,
    openPopup,
    closePopup,
    isModalOpen,
    addToAllNotes,
    editedNote,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleColorClick = (color: string) => {
    openPopup(color);
    closeDropdown();
  };

  const Dropdown = () => {
    return (
      <div className={`dropdown`}>
        <div
          className="color red"
          onClick={() => handleColorClick("red")}
        ></div>
        <div
          className="color purple"
          onClick={() => handleColorClick("purple")}
        ></div>
        <div
          className="color green"
          onClick={() => handleColorClick("green")}
        ></div>
        <div
          className="color sky"
          onClick={() => handleColorClick("sky")}
        ></div>
        <div
          className="color yellow"
          onClick={() => handleColorClick("yellow")}
        ></div>
      </div>
    );
  };

  return (
    <div className="add-button-container">
      <FaCirclePlus
        className={`add-icon ${showDropdown ? "rotate-icon" : ""}`}
        onClick={handleIconClick}
      />
      {showDropdown && <Dropdown />}
      {isModalOpen && (
        <NoteModal
          selectedColor={selectedColor}
          closePopup={closePopup}
          addToAllNotes={addToAllNotes}
          editedNote={editedNote}
        />
      )}
    </div>
  );
}

export default SideBar;