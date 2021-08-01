import axios from "axios";

const getAll = () => {
  return axios
    .get("http://localhost:3001/persons")
    .then((response) => response.data);
};

const createContact = (contact) => {
  return axios
    .post("http://localhost:3001/persons", contact)
    .then((response) => response.data);
};

const deleteContact = (id) => {
  return axios.delete(`http://localhost:3001/persons/${id}`);
};

const updateContact = (id, data) => {
  return axios
    .put(`http://localhost:3001/persons/${id}`, data)
    .then((response) => response.data);
};

export default { getAll, createContact, deleteContact, updateContact };
