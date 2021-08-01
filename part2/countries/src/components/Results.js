import React from "react";

import Country from "./Country";

const Results = (props) => {
  const { searchResults } = props;

  if (searchResults.length === 0)
    return (
      <div>
        <p>No countries were found.</p>
      </div>
    );

  if (searchResults.length > 10)
    return (
      <div>
        <p>Too many matches, be more specific.</p>
      </div>
    );

  if (searchResults.length <= 10)
    return (
      <div>
        {searchResults.map((country) => (
          <Country country={country} />
        ))}
      </div>
    );
};

export default Results;
