import axios from "axios";

// axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "https://backend-kcrk.onrender.com",
  withCredentials: true,
});
export default instance;
