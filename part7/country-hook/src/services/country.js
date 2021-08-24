import axios from "axios";

const getByName = async (name) => {
  if (!name) return { found: false, countreis: null };
  try {
    const response =
      await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true
    `);

    const countries = response.data.map((country) => {
      const { name, capital, population, flag } = country;
      return {
        name,
        capital,
        population,
        flag,
      };
    });
    return {
      found: true,
      data: countries[0],
    };
  } catch (error) {
    return { found: false, countreis: null };
  }
};

export default { getByName };
