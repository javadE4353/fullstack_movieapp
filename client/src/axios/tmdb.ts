
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
    // return axiosClient.get(url+"discover/movie?sort_by=popularity.desc&"+`api_key=${apiConfig.apiKey}`);
  },
  // getTvList: (type:keyof TvType, params:Params) => {
  //     const url = 'tv/' + tvType[type];
  //     return axiosClient.get(url, params);
  // },
  // getVideos: (cate:keyof Category, id:number) => {
  //     const url = category[cate] + '/' + id + '/videos';
  //     return axiosClient.get(url, {params: {}});
  // },
  // search: (cate: keyof Category, params:Params) => {
  //     const url = 'search/' + category[cate];
  //     return axiosClient.get(url, params);
  // },
  // detail: (cate:keyof Category, id:number, params:Params) => {
  //     const url = category[cate] + '/' + id;
  //     return axiosClient.get(url, params);
  // },
  // credits: (cate:keyof Category, id:number) => {
  //     const url = category[cate] + '/' + id + '/credits';
  //     return axiosClient.get(url, {params: {}});
  // },
  // similar: (cate:keyof Category, id:number) => {
  //     const url = category[cate] + '/' + id + '/similar';
  //     return axiosClient.get(url, {params: {}});
  // },
};
export default tmdbApi;
