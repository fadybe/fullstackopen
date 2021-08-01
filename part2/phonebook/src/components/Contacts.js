import React from "react";

const Contacts = (props) => {
  const { contacts, deleteContact } = props;

  return (
    <div>
      <h2>Numbers</h2>
      {contacts.map((contact) => (
        <div key={contact.id}>
          {contact.name} {contact.number}{" "}
          <button
            onClick={() => {
              deleteContact(contact.id);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
