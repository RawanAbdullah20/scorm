import axios from "axios";
import { computed } from "vue";
const axiosInstance = axios.create({
  //  baseURL: "https://development.himam.com/api/",
  baseURL: "https://49be-176-29-47-134.ngrok.io/api/",
  // baseURL: "http://158.101.229.40:3000/api/",
});

export default axiosInstance;
