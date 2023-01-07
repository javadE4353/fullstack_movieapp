import {
  ACCESSTOKEN_FAIL,
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
} from "../types/types";

interface requestAccessToken {
  type: "ACCESSTOKEN_REQUEST";
  payload: { errorMessage: null };
}
interface successAccessToken {
  type: "ACCESSTOKEN_SUCCESS";
  payload: { errorMessage:null,accessToken:string | undefined };
}
interface failAccessToken {
  type: "ACCESSTOKEN_FAIL";
  payload: { errorMessage: string | null };
}

export type Action = requestAccessToken | successAccessToken | failAccessToken;
