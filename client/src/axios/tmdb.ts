
import axiosClient from "./apiClient";
import apiConfig from "./configApi";

interface Category {
  movie: string;
  tv: string;
}
interface MovieType {
  upcoming: string;
  popular: string;
  top_rated: string;
}
interface TvType {
  popular: string;
  top_rated: string;
  on_the_air: string;
}

interface Params {
  page: number;
}

export const category: Category = {
  movie: "movie",
  tv: "tv",
};

export const movieType: MovieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType: TvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

const tmdbApi = {
  getMoviesList: () => {
    const url = apiConfig.baseUrl;
    return axiosClient.get(url+"movie/popular?"+`api_key=${apiConfig.apiKey}&page=1`);
  },
};
export default tmdbApi;
