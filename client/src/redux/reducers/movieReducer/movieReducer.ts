
import {
  REQUESTMOVIES,
  REQUESTGETMOVIES,
  REQUESTDELETEMOVIES,
  REQUESTUPDATEMOVIES,
  REQUESTINSERTMOVIE,
  REQUESTFAILMOVIES,
  REQUESTGETMOVIE,
  REQUESTGETALLMOVIE
} from "../../types/types";

import { Action } from "../../action/actionMovie";
import { Movies } from "../../../typeing";

interface MovieType {
  movies: Movies[] | null;
  Allmovie: Movies[] | null;
  movie: Movies | null;
  insert: number;
  update: number;
  delete: number;
  count:number | null
  isloading: boolean;
  ErrorMessage:string | null
}

const initialState = {
  movies: null,
  movie: null,
  Allmovie:null,
  count:null,
  insert: 0,
  update: 0,
  delete: 0,
  isloading: false,
  ErrorMessage:null
};

const movieReducer = (state: MovieType = initialState, action: Action) => {
  const { type } = action;

  switch (type) {
    case REQUESTMOVIES:
      return {
        isloading: true,
      };
      break;
    case REQUESTGETMOVIES:
      return {
        movies: action?.payload?.movies,
        count: action?.payload?.count,
        isloading: false,
      };
      break;
    case REQUESTGETALLMOVIE:
      return {
        Allmovie: action?.payload?.Allmovie,
        isloading: false,
      };
      break;
    case REQUESTGETMOVIE:
      return {
        movie: action?.payload?.movie,
        isloading: false,
      };
      break;
    case REQUESTDELETEMOVIES:
      return {
        delete: action?.payload?.delete,
        isloading: false,
      };
      break;
    case REQUESTUPDATEMOVIES:
      return {
        update: action?.payload?.update,
        isloading: false,
      };
      break;
    case REQUESTINSERTMOVIE:
      return {
        insert: action?.payload?.insert,
        isloading: false,
      };
      break;
    case REQUESTFAILMOVIES:
      return {
        ErrorMessage: action?.payload?.ErrorMessage,
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default movieReducer;
