import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REFRESH_ACCESSTOKEN,
  VERIFY_ACCOUNT,
  LOGOUT
} from "../types/types";
import {Userinfo} from "../../typeing"
interface requestTypeAuth {
  type: "LOGIN_REQUEST";
  payload: { accessToken: null; userInfo: null; errorMessage: null };
}
interface successAuth {
  type: "LOGIN_SUCCESS";
  payload: { accessToken: string; userInfo: Userinfo; errorMessage: null };
}
interface failrequestAuth {
  type: "LOGIN_FAIL";
  payload: { accessToken: null; userInfo: null; errorMessage: string };
}
interface logout {
  type: "LOGOUT";
  payload: { accessToken: null; userInfo: null; errorMessage: null };
}
interface refreshToken {
  type: "REFRESH_ACCESSTOKEN";
  payload: { accessToken: string; userInfo: Userinfo; errorMessage: null };
}

export type Action = requestTypeAuth | successAuth | failrequestAuth |refreshToken |logout;
