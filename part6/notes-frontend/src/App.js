import React, { useState, useEffect, useRef } from "react";

import noteService from "./services/notes";

import Note from "./components/Note";
import Notification from "./components/Notification";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Toggleable from "./components/Toggelable";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (newNoteObject) => {
    noteFormRef.current.toggleVisibility();

    noteService.create(newNoteObject).then((createdNote) => {
      setNotes(notes.concat(createdNote));
    });
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const toggleImportanceById = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((updatedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note ${note.content} was already removed from server.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const noteForm = () => (
    <Toggleable buttonLabel="New note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Toggleable>
  );

  const loginForm = () => (
    <Toggleable buttonLabel="log in">
      <LoginForm login={handleLogin} />
    </Toggleable>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>logged in as {user.name}</p>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "show important" : "show all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            label={
              note.important ? "Select as not important" : "Select as important"
            }
            toggleImportance={() => {
              toggleImportanceById(note.id);
            }}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
