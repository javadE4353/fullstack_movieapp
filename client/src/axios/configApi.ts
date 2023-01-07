import axios from "axios";

const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "0f03ae9e9244ff0b99b6ca724f605bad",
  originalImage: `https://image.tmdb.org/t/p/original/`,
  w500Image: (imgPath: string) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=0f03ae9e9244ff0b99b6ca724f605bad&language=en-US`,
  fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/movie?api_key=0f03ae9e9244ff0b99b6ca724f605bad&with_networks=213`,
  fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=0f03ae9e9244ff0b99b6ca724f605bad&language=en-US`,
  fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=0f03ae9e9244ff0b99b6ca724f605bad&language=en-US&with_genres=28`,
  fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=0f03ae9e9244ff0b99b6ca724f605bad&language=en-US&with_genres=35`,
  fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=0f03ae9e9244ff0b99b6ca724f605bad&language=en-US&with_genres=27`,
  fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=0f03ae9e9244ff0b99b6ca724f605bad&language=en-US&with_genres=10749`,
  fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=0f03ae9e9244ff0b99b6ca724f605bad&language=en-US&with_genres=99`,
};

export const BASE_URL = "http://localhost:7000/api/v1";

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

export default apiConfig;
