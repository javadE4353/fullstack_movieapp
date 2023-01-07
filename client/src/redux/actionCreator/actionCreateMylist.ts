import {
  REQUESTMYLIST,
  REQUESTSECCESSMYLIST,
  INSERTMYLIST,
  REQUESTFAILDMYLIST,
  REMOVEMYLIST,
} from "../types/types";
import { BASE_URL } from "../../axios/configApi";
import { Movies } from "../../typeing";
import { AxiosInstance } from "axios";

interface Payload {
  mylist: Movies[] | null;
  delete: number;
  count: number;
  insert: number;
}

type MoviesAction = {
  type: string;
  payload?: Payload;
};

interface Option {
  page?: number;
  pageSize?: number;
  category?: number;
  all?: boolean;
  search?: string;
}

type DispatchType = (args: MoviesAction) => MoviesAction;

export const getAllmylist = (
  axiosPrivate: AxiosInstance,
  userid: number,
  option: Option
) => {
  let url = `${BASE_URL}/mylist/${userid}`;
  let baseUrl = ``;
  if (option?.page && option.pageSize && option?.all && option?.category) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&category=${option?.category}&all=${option.all}`;
  } else if (option?.page && option.pageSize && option?.category) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&category=${option?.category}`;
  } else if (option?.page && option.pageSize && option?.category) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&category=${option?.category}`;
  } else if (option?.search) {
    baseUrl = `${url}?search=${option?.search}`;
  } else if (option?.page && option.pageSize) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}`;
  } else if (option?.page) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${1000}`;
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
    dispatch({ type: REQUESTMYLIST });
    try {
      const response = await axiosPrivate.get(`${baseUrl}`);
      console.log(response);
      dispatch({
        type: REQUESTSECCESSMYLIST,
        payload: {
          mylist: response?.data?.data.movies,
          count: response?.data?.data.count,
          delete: 0,
          insert: 0,
        },
      });
    } catch (error) {
      // console.log(error)
      dispatch({
        type: REQUESTFAILDMYLIST,
        payload: { mylist: null, count:0, delete: 0, insert: 0 },
      });
    }
  };
};

interface PayloadInsert {
  insert: number;
}

type MoviesActionInsert = {
  type: string;
  payload?: PayloadInsert;
};

type DispatchTypeInsert = (args: MoviesActionInsert) => MoviesActionInsert;

//INSERTMYLIST
export const insertmylist = (movie: Movies, axiosPrivate: AxiosInstance) => {
  return async (dispatch: DispatchTypeInsert) => {
    dispatch({ type: REQUESTMYLIST });

    try {
      const response = await axiosPrivate.post(`${BASE_URL}/mylist`, movie);
      // console.log(response);
      dispatch({
        type: INSERTMYLIST,
        payload: { insert: 201 },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REQUESTFAILDMYLIST,
        payload: { insert: 0 },
      });
    }
  };
};

//REMOVEMYLIST
interface PayloadDelete {
  mylist: Movies[] | null;
  delete: number;
  count: number ;
  insert: number;
}

type MoviesActionDelete = {
  type: string;
  payload?: PayloadDelete;
};
interface OptionDelete {
  page?: number;
  pageSize?: number;
}
type DispatchTypeDelete = (args: MoviesActionDelete) => MoviesActionDelete;

export const removeMovieMylist = (
  axiosPrivate: AxiosInstance,
  userid: number,
  movieid: number,
  option:OptionDelete
) => {

  let url = `${BASE_URL}/mylist`;
  let baseUrl = ``;
    if (option?.page && option?.pageSize ) {
    baseUrl = `${url}/${userid}/?page=${option?.page}&pageSize=${option.pageSize}`;
  } else if (
    Object.keys(option).length < 1 ||
    option == null ||
    option == undefined
  ) {
    baseUrl = `${url}`;
  }
  // console.log(baseUrl);
  return async (dispatch: DispatchTypeDelete) => {
    dispatch({ type: REQUESTMYLIST });

    try {
      const response = await axiosPrivate.delete(
        `${BASE_URL}/mylist?userid=${userid}&movieid=${movieid}`
      );
      // console.log(response);
      dispatch({
        type: REMOVEMYLIST,
        payload: { mylist: null,count:0, delete: 200, insert: 0 },
      });
      if (response?.status === 200) {
        const response = await axiosPrivate.get(
          `${baseUrl}`
        );
        dispatch({
          type: REQUESTSECCESSMYLIST,
          payload: {
            mylist: response?.data?.data.movies,
            count: response?.data?.data.count,
            delete: 0,
            insert: 0,
          },
        });
      }
    } catch (error) {
      // console.log(error);
      dispatch({
        type: REQUESTFAILDMYLIST,
        payload: { mylist: null,count:0, delete: 0, insert: 0 },
      });
    }
  };
};
