import axios from "axios";
import { attachAuthHeader, attachAuthInterceptor } from "./interceptor";
import config from "./config";

const api = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});



attachAuthHeader(api);
attachAuthInterceptor(api);


export { api };
