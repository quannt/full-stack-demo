import axios from "axios";

const baseApiUrl = process.env.VUE_APP_API_SERVER;

export default {
  getUsers(params) {
    let url = new URL(`${baseApiUrl}/users`);

    if (!params) {
      return axios.get(`${url.href}`);
    }
    const newParams = new URLSearchParams(url.search);
    for (let param of params) {
      newParams.append(`${param.key}[$search]`, param.value);
    }
    return axios.get(`${url.href}?${newParams}`);
  },
  createUser(user) {
    return axios.post(`${baseApiUrl}/users`, user);
  }
};
