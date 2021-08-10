import React from "react";

const Note = (props) => {
  const { note, label, toggleImportance } = props;

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
