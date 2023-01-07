import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_ACCESSTOKEN,
  VERIFY_ACCOUNT,
  LOGOUT
} from "../../types/types";

import { Action } from "../../action/actionLogin";
import { Userinfo } from "../../../typeing";

interface StateTypeAuth {
  accessToken: string | null ;
  userInfo: Userinfo  | null;
  isLoading: boolean;
  errorMessage: null | string;
}

const initialState = {
  accessToken:null,
  userInfo: null,
  isLoading: false,
  errorMessage: null,
};

function loginReducer(state: StateTypeAuth = initialState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        accessToken: payload.accessToken,
        userInfo: payload.userInfo,
        isLoading: false,
        errorMessage: null,
      };
    case LOGOUT:
      return {
        accessToken: payload.accessToken,
        userInfo: payload.userInfo,
        isLoading: false,
        errorMessage: null,
      };

    case LOGIN_FAIL:
      return {
        userInfo: null,
        accessToken: null,
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    case REFRESH_ACCESSTOKEN:
      return {
        ...state,
        userInfo: payload.userInfo,
        accessToken: payload.accessToken,
        isLoading: false,
      };
    // case VERIFY_ACCOUNT:
    //   return {
    //     ...state,
    //     userInfo: {
    //       ...state.userInfo,
    //       verified: payload.verified,
    //     },
    //   };

    default:
      return state;
  }
}

export default loginReducer;
