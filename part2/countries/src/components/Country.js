import React, { useState } from "react";

const ShowButton = (props) => {
  const { text, onClick } = props;
  return <button onClick={onClick}>{text}</button>;
};

const Country = (props) => {
  const { country } = props;
  const [expanded, setExpanded] = useState(false);

  const handleShowClick = () => {
    setExpanded(!expanded);
  };

  if (!expanded)
    return (
      <div>
        <h2>{country.name}</h2>
        <ShowButton text="Show" onClick={handleShowClick} />
      </div>
    );

  return (
    <div>
      <h2>{country.name}</h2>
      <ShowButton text="Hide" onClick={handleShowClick} />

      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Languages: </p>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <h3>{country.name}'s flag</h3>
      <img src={country.flag} alt={country.name + "'s flag"}></img>
    </div>
  );
};

export default Country;
