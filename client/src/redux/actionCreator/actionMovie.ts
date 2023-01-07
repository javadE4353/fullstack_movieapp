import {
  REQUESTMOVIES,
  REQUESTGETMOVIES,
  REQUESTDELETEMOVIES,
  REQUESTUPDATEMOVIES,
  REQUESTINSERTMOVIE,
  REQUESTFAILMOVIES,
  REQUESTGETALLMOVIE,
} from "../types/types";
import apiConfig, { axiospublic, BASE_URL } from "../../axios/configApi";
import { Movies } from "../../typeing";
import { AxiosInstance } from "axios";

interface Payload {
  movies: Movies[] | null;
  Allmovie: Movies[] | null;
  insert: number;
  update: number;
  delete: number;
  count: number | null;
  ErrorMessage: string | null;
}

interface Option {
  page?: number;
  pageSize?: number;
  category?: number;
  username?: string;
  all?: boolean;
  search?: string;
}

type MoviesAction = {
  type: string;
  payload?: Payload;
};
type DispatchType = (args: MoviesAction) => MoviesAction;

export const getmovies = (axiosPrivate: AxiosInstance, option: Option) => {
  let url = `${BASE_URL}/movies`;
  let baseUrl = ``;
  if (
    option?.page &&
    option.pageSize &&
    option?.all &&
    option?.category &&
    option?.username
  ) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&category=${option?.category}&username=${option?.username}&all=${option.all}`;
  } else if (
    option?.page &&
    option.pageSize &&
    option?.category &&
    option?.username
  ) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&category=${option?.category}&username=${option?.username}`;
  } else if (option?.page && option.pageSize && option?.category) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&category=${option?.category}`;
  } else if (option?.search) {
    baseUrl = `${url}?search=${option?.search}`;
  } else if (option?.page && option.pageSize && option?.username) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&username=${option?.username}`;
  } else if (option?.category && option?.username) {
    baseUrl = `${url}?category=${option?.category}&username=${option?.username}`;
  } else if (option?.page && option.pageSize) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}`;
  } else if (option?.page) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${1000}`;
  } else if (option?.username) {
    baseUrl = `${url}?username=${option?.username}`;
  } else if (option?.category) {
    baseUrl = `${url}?category=${option?.category}`;
  } else if (option?.all) {
    baseUrl = `${url}?all=true`;
  } else if (
    Object.keys(option).length < 1 ||
    option == null ||
    option == undefined
  ) {
    baseUrl = `${url}`;
  }
  // console.log(baseUrl);
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiosPrivate.get(`${baseUrl}`);
      dispatch({
        type: REQUESTGETMOVIES,
        payload: {
          movies: response?.data.data?.movies,
          count: response?.data.data?.count,
          Allmovie: null,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: null,
        },
      });
      console.log(response?.data.data);
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: {
          movies: null,
          count: null,
          Allmovie: null,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: ErrorMsg,
        },
      });
    }
  };
};

// get movie single movie action

interface Payloadgetmovie {
  movie: Movies | null;
  insert: number;
  update: number;
  delete: number;
  ErrorMessage: string | null;
}

type MovieAction = {
  type: string;
  payload?: Payloadgetmovie;
};
type DispatchTypemovie = (args: MovieAction) => MovieAction;

export const getmovie = (
  axiosPrivate: AxiosInstance,
  category: string,
  title: string
) => {
  return async (dispatch: DispatchTypemovie) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiosPrivate.get(
        `${BASE_URL}/movies?&category=${category}&title?page=${title}`
      );
      dispatch({
        type: REQUESTGETMOVIES,
        payload: {
          movie: response?.data.data,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: null,
        },
      });
      // console.log(response?.data?.data)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: {
          movie: null,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: ErrorMsg,
        },
      });
    }
  };
};
// get Allmovie public

interface PayloadgetAllmovie {
  Allmovie: Movies[] | null;
  insert: number;
  update: number;
  delete: number;
  ErrorMessage: string | null;
}

type MovieActionAllmovie = {
  type: string;
  payload?: PayloadgetAllmovie;
};
type DispatchTypAllmovie = (args: MovieActionAllmovie) => MovieActionAllmovie;

export const getAllmovie = () => {
  return async (dispatch: DispatchTypAllmovie) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiospublic.get(`${BASE_URL}/movies/allmovie`);
      dispatch({
        type: REQUESTGETALLMOVIE,
        payload: {
          Allmovie: response?.data?.data,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: null,
        },
      });
      // console.log(response);
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: {
          Allmovie: null,
          update: 0,
          insert: 0,
          delete: 0,
          ErrorMessage: ErrorMsg,
        },
      });
    }
  };
};

// insert movie

interface Payloadinsert {
  insert: number;
  ErrorMessage: string | null;
}

type MovieActioninsert = {
  type: string;
  payload?: Payloadinsert;
};
type DispatchTypeinsert = (args: MovieActioninsert) => MovieActioninsert;

export const insertmovie = (
  axiosPrivate: AxiosInstance,
  data: FormData,
  userid: number
) => {
  return async (dispatch: DispatchTypeinsert) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiosPrivate.post(
        `${BASE_URL}/movies?userid=${userid}`,
        data
      );
      dispatch({
        type: REQUESTINSERTMOVIE,
        payload: { insert: response?.data?.data[0], ErrorMessage: null },
      });
      // console.log(response?.data?.data)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: { insert: 0, ErrorMessage: ErrorMsg },
      });
    }
  };
};

// delete movie

interface Payloaddelete {
  delete: number;
  movies: Movies[] | null;
  count: number;
  Allmovie: Movies[] | null;
  ErrorMessage: string | null;
}

type MovieActiondelete = {
  type: string;
  payload?: Payloaddelete;
};
type DispatchTypedelete = (args: MovieActiondelete) => MovieActiondelete;

export const deletemovie = (
  axiosPrivate: AxiosInstance,
  title: string,
  movieid: number,
  page: number,
  pageSize: number
) => {
  return async (dispatch: DispatchTypedelete) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiosPrivate.delete(
        `${BASE_URL}/movies?title=${title}&movieid=${movieid}`
      );
      if (response?.status === 200) {
        const res = await axiosPrivate.get(
          `${BASE_URL}/movies?page=${page}&pageSize=${pageSize}`
        );

        if (res?.status === 200) {
          const resp = await axiosPrivate.get(`${BASE_URL}/movies/allmovie`);
          dispatch({
            type: REQUESTGETMOVIES,
            payload: {
              Allmovie: resp?.data.data,
              movies: res?.data.data?.movies,
              count: res?.data.data?.count,
              delete: 0,
              ErrorMessage: null,
            },
          });
          // console.log(response?.data?.data);
          // console.log(res?.data?.data);
        }
      }
      // console.log(response?.data?.data);
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: {
          delete: 0,
          movies: null,
          Allmovie: null,
          ErrorMessage: ErrorMsg,
          count: 0,
        },
      });
    }
  };
};

// update movie

interface Payloadupdate {
  update: number;
  ErrorMessage: string | null;
}

type MovieActionupdate = {
  type: string;
  payload?: Payloadupdate;
};
type DispatchTypeupdate = (args: MovieActionupdate) => MovieActionupdate;

export const updatemovie = (
  axiosPrivate: AxiosInstance,
  data: FormData,
  movieid?: number,
  userid?: number
) => {
  return async (dispatch: DispatchTypeupdate) => {
    dispatch({ type: REQUESTMOVIES });
    try {
      const response = await axiosPrivate.put(
        `${BASE_URL}/movies?movieid=${movieid}&userid=${userid}`,
        data
      );
      dispatch({
        type: REQUESTUPDATEMOVIES,
        payload: { update: response?.data?.data[0], ErrorMessage: null },
      });
      console.log(response?.data?.data);
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: REQUESTFAILMOVIES,
        payload: { update: 0, ErrorMessage: ErrorMsg },
      });
    }
  };
};

export default getmovies;
