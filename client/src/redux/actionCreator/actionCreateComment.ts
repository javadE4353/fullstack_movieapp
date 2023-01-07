import {
  REQUESTCOMMENT,
  SUCCESSCOMENT,
  FAILDCOMMENT,
  INSERTCOMMENT,
} from "../types/types";
import { BASE_URL } from "../../axios/configApi";
import { CommentType } from "../../typeing";
import { AxiosInstance } from "axios";

interface typeState {
  comment: CommentType[] | null;
  insert: number;
  delete: number;
  ErrorMassege: string;
}

type payload = {
  type: string;
  payload?: typeState;
};
type DispatchType = (args: payload) => payload;

export const getComments = (
  movietitle: string,
  movieid: number,
  axiosPrivate: AxiosInstance
) => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTCOMMENT });
    try {
      const response = await axiosPrivate.get(
        `${BASE_URL}/review?movieid=${movieid}&movietitle=${movietitle}`
      );
      // console.log(response?.data?.data);
      dispatch({
        type: SUCCESSCOMENT,
        payload: {
          comment: response?.data?.data,
          ErrorMassege: "",
          insert: 0,
          delete: 0,
        },
      });
    } catch (error) {
      let errorMsg = "error";
      dispatch({
        type: FAILDCOMMENT,
        payload: {
          ErrorMassege: errorMsg,
          insert: 0,
          delete: 0,
          comment: null,
        },
      });
    }
  };
};

//INSERTCOMMENT
interface typeStateInsert {
  insert: number;
  comment: CommentType[] | null;
  ErrorMassege: string;
}

type payloadInsert = {
  type: string;
  payload?: typeStateInsert;
};
type DispatchTypeInsert = (args: payloadInsert) => payloadInsert;

export const insertComment = (
  data: CommentType,
  axiosPrivate: AxiosInstance
) => {
  return async (dispatch: DispatchTypeInsert) => {
    dispatch({ type: REQUESTCOMMENT });
    try {
      const response = await axiosPrivate.post(`${BASE_URL}/review`, data);
      if (response?.status === 201) {
        const res = await axiosPrivate.get(
          `${BASE_URL}/review?movieid=${data.movieid}&movietitle=${data.movietitle}`
        );
        dispatch({
          type: INSERTCOMMENT,
          payload: {
            insert: 201,
            comment: res?.data?.data,
            ErrorMassege: "",
          },
        });
      }
    } catch (error: any) {
      let ErMsg = "";
      dispatch({
        type: FAILDCOMMENT,
        payload: { ErrorMassege: ErMsg, insert: 0, comment: null },
      });
    }
  };
};
//DELETECOMMENT
interface typeStateDelete {
  delete: number;
  comment: CommentType[] | null;
  ErrorMassege: string;
}

type payloadDelete = {
  type: string;
  payload?: typeStateDelete;
};
type DispatchTypeDelete = (args: payloadDelete) => payloadDelete;

export const DeleteComment = (
 userid:number,
 movieid:number,
 movietitle:string,
 createdAt:string,
  axiosPrivate: AxiosInstance
) => {
  return async (dispatch: DispatchTypeDelete) => {
    dispatch({ type: REQUESTCOMMENT });
    try {
      const response = await axiosPrivate.delete(`${BASE_URL}/review?userid=${userid}&movieid=${movieid}&createdAt=${createdAt}`);
      if (response?.status === 200) {
        const res = await axiosPrivate.get(
          `${BASE_URL}/review?movieid=${movieid}&movietitle=${movietitle}`
        );
        dispatch({
          type: INSERTCOMMENT,
          payload: {
            delete: 200,
            comment: res?.data?.data,
            ErrorMassege: "",
          },
        });
      }
    } catch (error: any) {
      let ErMsg = "";
      dispatch({
        type: FAILDCOMMENT,
        payload: { ErrorMassege: ErMsg, delete: 0, comment: null },
      });
    }
  };
};
