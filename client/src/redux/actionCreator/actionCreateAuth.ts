import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../types/types";
import { axiospublic } from "../../axios/configApi";
import { Userinfo } from "../../typeing";

interface typePayload {
  accessToken: string | null ;
  userInfo: Userinfo | null;
  errorMessage: null | string;
}

type Payload = {
  type: string;
  payload: typePayload;
};

type DispatchType = (args: Payload) => Payload;
const login =
  (username: string, password: string) => async (dispatch: DispatchType) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
        payload: {
          accessToken: null,
          userInfo: null,
          errorMessage: null,
        },
      });

      const res = await axiospublic.post(
        "/auth/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          accessToken: res?.data?.data?.accessToken,
          userInfo: res?.data?.data?.userInfo,
          errorMessage: null,
        },
      });
    } catch (error: any) {
      let errorMessage = null;
      if (!error?.response) {
        console.log(error?.response?.status)
        errorMessage = "سرور پشتیبانی نمیشود";
      } else if (error?.response?.status === 400) {
        errorMessage = "رمز ورود اشتباه است";
      } else if (error?.response?.status === 401) {
        errorMessage = "رمز ورود یا نام کاریری درست وارد نشده";
      } else {
        errorMessage = "لطفا بعدا دوباره امتحان کنید";
      }
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          accessToken: null,
          userInfo: null,
          errorMessage: errorMessage,
        },
      });
    }
  };

export const actionLogout = () => {
  return (dispatch: DispatchType) => {
    dispatch({
      type: LOGOUT,
      payload: {
        accessToken: null,
        userInfo: null,
        errorMessage: null,
      },
    });
  };
};

export default login;
