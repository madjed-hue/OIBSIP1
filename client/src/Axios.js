import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-kcrk.onrender.com",
});
export default instance;
