import React from "react";

const Form = (props) => {
  const {
    nameValue,
    numberValue,
    handleNameChange,
    handleNumberChange,
    addNewContact,
  } = props;

  return (
    <form onSubmit={addNewContact}>
      <h2>Add new contact</h2>
      <div>
        Name: <input value={nameValue} onChange={handleNameChange} />
      </div>
      <div>
        Phone: <input value={numberValue} onChange={handleNumberChange} />
      </div>
      <div>
        <button>Add</button>
      </div>
    </form>
  );
};

export default Form;
