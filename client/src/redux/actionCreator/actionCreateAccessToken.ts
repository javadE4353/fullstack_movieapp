import {
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAIL,
  REFRESH_ACCESSTOKEN,
  LOGIN_REQUEST,
  LOGIN_FAIL,
} from "../types/types";

import {Dispatch} from "redux"
import { axiospublic } from "../../axios/configApi";
import { Userinfo } from "../../typeing";

type Payload = {
  errorMessage: string | null;
  accessToken:string | null
};

type PayloadRefreshToken = {
  type: string;
  payload?: Payload;
};

type DispatchType = (args: PayloadRefreshToken) => PayloadRefreshToken;
const newAccessTokenAction = (dispaTch:Dispatch) => async (dispatch: DispatchType) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const response = await axiospublic.get("/auth/refreshtoken");
    dispaTch({
      type: REFRESH_ACCESSTOKEN,
      payload: {
        accessToken: response.data.data.accessToken,
        userInfo: response.data.data.userInfo,
      },
    });
  } catch (error:any) {
    let errorMsg = '';
      if (!error?.response) {
        errorMsg = "Server not respond";
      } else {
        errorMsg = "Invalid refresh token";
      }
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          accessToken: null,
          errorMessage: errorMsg,
        },
      });
  }
};

export default newAccessTokenAction;
