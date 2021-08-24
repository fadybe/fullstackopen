import axios from "axios";

const baseUrl = "/api/stats";

let token = null;

const getStats = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export default { getStats, setToken };
