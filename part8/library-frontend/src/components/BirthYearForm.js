import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR } from "../queries";
import Select from "react-select";

const BirthYearForm = (props) => {
  const { authors } = props;

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR);

  const selectOptions = authors.map((author) => {
    return { value: author.name, label: author.name };
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!name || !born) return;

    const mutationVariables = { name, born };
    updateAuthor({ variables: mutationVariables });

    setBorn("");
  };

  return (
    <div>
      <h2>Update Author's birthday</h2>
      <form onSubmit={handleOnSubmit}>
        <Select
          options={selectOptions}
          onChange={(selection) => setName(selection.label)}
        />
        <div>
          born
          <input
            value={born}
            onChange={(event) => {
              if (!event.target.value) return;
              setBorn(Number.parseInt(event.target.value));
            }}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
