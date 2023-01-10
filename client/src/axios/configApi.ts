import axios from "axios";

export const BASE_URL = "http://193.186.32.204:8800/api/v1";

export const axiospublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
});

