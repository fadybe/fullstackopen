import { useState, useEffect } from "react";

import countryService from "../services/country";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      const response = await countryService.getByName(name);
      setCountry(response);
    }

    fetchCountry();
  }, [name]);

  return country;
};
