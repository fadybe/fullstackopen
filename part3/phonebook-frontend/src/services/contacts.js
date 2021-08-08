import axios from "axios";

const baseUrl = "/api";

const getAll = () => {
  return axios.get(`${baseUrl}/persons`).then((response) => response.data);
};

const createContact = (contact) => {
  return axios
    .post(`${baseUrl}/persons`, contact)
    .then((response) => response.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/persons/${id}`);
};

const updateContact = (id, data) => {
  return axios
    .put(`${baseUrl}/persons/${id}`, data)
    .then((response) => response.data);
};

export default { getAll, createContact, deleteContact, updateContact };
