import http from "../http-common";
const getAll = () => {
  return http.get("/codingpaper");
};
const get = id => {
  return http.get(`/codingpaper/${id}`);
};
const create = data => {
  return http.post("/codingpaper", data);
};
const update = (id, data) => {
  return http.put(`/codingpaper/${id}`, data);
};
const remove = id => {
  return http.delete(`/codingpaper/${id}`);
};
const removeAll = () => {
  return http.delete(`/codingpaper`);
};
const findByTitle = title => {
  return http.get(`/codingpaper?title=${title}`);
};

const createGuideline = data => {
  return http.post("/addGuideline", data);
};
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  createGuideline
};