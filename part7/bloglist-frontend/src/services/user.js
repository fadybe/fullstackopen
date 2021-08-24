import axios from "axios";

const baseUrl = "/api/users";

let token = null;

const getProfile = async (userId) => {
  const config = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/${userId}`;

  const response = await axios.get(url, config);
  return response.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export default { getProfile, setToken };
