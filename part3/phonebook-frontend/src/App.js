import React, { useState, useEffect } from "react";

import contactsService from "./services/contacts";

import Contacts from "./components/Contacts";
import Form from "./components/Form";
import Notification from "./components/Notification";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    contactsService.getAll().then((allContacts) => {
      setContacts(allContacts);
      setSearchResults(allContacts);
    });
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
    setSearchResults(getSearchResults(event.target.value));
  };

  const getSearchResults = (str) => {
    const results =
      str === ""
        ? contacts
        : contacts.filter((contact) =>
            contact.name.toLowerCase().includes(str.toLowerCase())
          );
    return results;
  };

  const updateErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const deleteContact = (id) => {
    let name;

    contacts.forEach((c) => {
      if (c.id === id) name = c.name;
    });

    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}'s contact?`
    );

    if (confirmed) {
      contactsService
        .deleteContact(id)
        .then(() => {
          updateErrorMessage("contact deleted successfully from server.");
        })
        .catch((error) => {
          updateErrorMessage("Contact is already deleted from the server.");
        })
        .finally(() => {
          setContacts(contacts.filter((contact) => contact.id !== id));
          setSearchResults(
            searchResults.filter((contact) => contact.id !== id)
          );
        });
    }
  };

  const addNewContact = (event) => {
    event.preventDefault();
    const newContactToAdd = { name: newName, number: newNumber };

    const nameExists = contacts.find((c) => c.name === newContactToAdd.name);
    const numberExists = contacts.find(
      (c) => c.number === newContactToAdd.number
    );

    if (nameExists !== undefined || numberExists !== undefined) {
      if (nameExists !== undefined) {
        const nameConfirmationMsg = `${newContactToAdd.name} already exist in the phonebook with phone number: ${nameExists.number}, want to update phone number?`;
        if (window.confirm(nameConfirmationMsg))
          contactsService
            .updateContact(nameExists.id, newContactToAdd)
            .then((updatedContact) => {
              const newList = contacts.filter((c) => c.id !== nameExists.id);
              setContacts(newList.concat(updatedContact));
              setSearchResults(newList.concat(updatedContact));
              updateErrorMessage(
                `contact ${updatedContact.name} successfully from server.`
              );
            })
            .catch((error) => {
              console.log("=======================================");
              // console.log(error);
            });
      } else {
        if (numberExists) {
          const numberConfirmationMsg = `${newContactToAdd.number} already exist in the phonebook with name: ${numberExists.name}, want to update name?`;
          if (window.confirm(numberConfirmationMsg))
            contactsService
              .updateContact(numberExists.id, newContactToAdd)
              .then((updatedContact) => {
                const newList = contacts.filter(
                  (c) => c.id !== numberExists.id
                );
                setContacts(newList.concat(updatedContact));
                setSearchResults(newList.concat(updatedContact));
                updateErrorMessage(
                  `contact ${updatedContact.name} successfully from server.`
                );
              });
        }
      }
    } else {
      contactsService
        .createContact(newContactToAdd)
        .then((createdContact) => {
          setContacts(contacts.concat(createdContact));
          setSearchResults(contacts.concat(createdContact));
          updateErrorMessage(
            `contact ${createdContact.name} successfully created.`
          );
        })
        .catch((err) => {
          updateErrorMessage(err.response.data.error.message);
        });
    }

    setNewName("");
    setNewNumber("");
    setSearchTerm("");
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={errorMessage} />
      <div>
        Search: <input value={searchTerm} onChange={handleSearchTerm} />
      </div>

      <Form
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNewContact={addNewContact}
      />

      <Contacts contacts={searchResults} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
