import {
  REQUESTMOVIES,
  REQUESTGETMOVIES,
  REQUESTGETMOVIE,
  REQUESTDELETEMOVIES,
  REQUESTUPDATEMOVIES,
  REQUESTINSERTMOVIE,
  REQUESTFAILMOVIES,
  REQUESTGETALLMOVIE,
} from "../types/types";
import { Movies } from "../../typeing";

interface requestMovie {
  type: "REQUESTMOVIES";
}
interface getmovies {
  type: "REQUESTGETMOVIES";
  payload:{ movies:Movies[],count:number};
}
interface getAllmovie {
  type: "REQUESTGETALLMOVIE";
  payload:{ Allmovie:Movies[]};
}
interface getmovie {
  type: "REQUESTGETMOVIE";
  payload:{ movie:Movies};
}
interface updatemovies {
  type: "REQUESTUPDATEMOVIES";
  payload: {update:number};
}
interface insertmovies {
  type: "REQUESTINSERTMOVIE";
  payload: {insert:number};
}
interface deletemovies {
  type: "REQUESTDELETEMOVIES";
  payload: {delete:number};
}
interface failmovies {
  type: "REQUESTFAILMOVIES";
  payload: {ErrorMessage:string | null};
}

export type Action = requestMovie | getmovies | getmovie | insertmovies|updatemovies|deletemovies|failmovies |getAllmovie;
