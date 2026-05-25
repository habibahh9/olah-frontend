import axios from "axios";

export const API_BASE_URL = "http://localhost:3000/api";

export const UNSPLASH_CLIENT_ID = "EZPAQwYn5geB44v2qwbVPaF9w-z8Zka1kPT5kYNjiu8";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export default api;