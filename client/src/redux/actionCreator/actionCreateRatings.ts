import {
  REQUESTRATING,
  SUCCESSRATING,
  FAILDRATING,
  INSERTRATING,
} from "../types/types";
import { BASE_URL } from "../../axios/configApi";
import { Movies, Ratings } from "../../typeing";
import { AxiosInstance } from "axios";

type Ratingdispatch = {
  type: string;
  payload: { rating: Ratings[] | null; status: number };
};
type DispatchType = (args: Ratingdispatch) => Ratingdispatch;

export const getRatings = (movietitle: string, axiosPrivate: AxiosInstance) => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESTRATING, payload: { rating: null, status: 102 } });
    try {
      console.log(BASE_URL)
      const response = await axiosPrivate.get(
        `${BASE_URL}/ratings?movietitle=${movietitle}`
      );
      // console.log(response?.data?.data);
      if (response?.status === 200) {
        dispatch({
          type: SUCCESSRATING,
          payload: { rating: response?.data?.data, status: 200 },
        });
      }
    } catch (error) {
      dispatch({
        type: FAILDRATING,
        payload: { rating: null, status: 0 },
      });
    }
  };
};

type RatingdispatchInsert = {
  type: string;
  payload: Ratings[] | null;
};
type DispatchTypeInsert = (args: RatingdispatchInsert) => RatingdispatchInsert;

export const insertRatings = (
  rated: Ratings,
  data: Movies,
  movietitle: string,
  movieid: number,
  userid: number,
  axiosPrivate: AxiosInstance
) => {
  return async (dispatch: DispatchTypeInsert) => {
    dispatch({ type: REQUESTRATING, payload: null });

    try {
      const response = await axiosPrivate.post(`${BASE_URL}/ratings`, rated);
      // console.log(rated);
      // console.log(response);
      dispatch({
        type: INSERTRATING,
        payload: null,
      });
      if (response?.status === 200) {
        const res = await axiosPrivate.put(
          `${BASE_URL}/movies?title=${movietitle}&movieid=${movieid}&userid=${userid}`,
          data
        );

        if (res?.status === 200 || res?.status === 200) {
          const response = await axiosPrivate.get(
            `${BASE_URL}/ratings?movietitle=${movietitle}`
          );
          // console.log(response?.data?.data);
          dispatch({
            type: SUCCESSRATING,
            payload: response?.data?.data,
          });
        }
      }
    } catch (error) {
      // console.log(rated);
      dispatch({
        type: FAILDRATING,
        payload: null,
      });
    }
  };
};
