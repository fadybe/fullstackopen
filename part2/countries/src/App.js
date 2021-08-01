import React, { useState, useEffect } from "react";

import axios from "axios";

import Results from "./components/Results";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };
  useEffect(fetchCountries, []);

  const handleSearchString = (event) => {
    const searchString = event.target.value;
    setSearchString(searchString);

    const results = countries.filter((country) =>
      country.name.toLowerCase().includes(searchString)
    );

    setSearchResults(results);
  };

  return (
    <div>
      <h1>Search</h1>
      countries: <input value={searchString} onChange={handleSearchString} />
      <h1>Results</h1>
      <Results searchResults={searchResults} />
    </div>
  );
}

export default App;
