import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(baseUrl, config);
  return request.data;
};

const likeBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseUrl}/${blogId}/like`, {}, config);
  return request.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const reponse = await axios.delete(`${baseUrl}/${blogId}`, config);
  console.log(reponse);
};

const postNewBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const getBlogById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

const commentOnBlog = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  );
  return response.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export default {
  getAll,
  postNewBlog,
  setToken,
  likeBlog,
  deleteBlog,
  getBlogById,
  commentOnBlog,
};
