import axios from "axios";

const baseApiUrl = process.env.VUE_APP_API_SERVER;

export default {
  getReviews() {
    return axios.get(`${baseApiUrl}/reviews`);
  }
};
