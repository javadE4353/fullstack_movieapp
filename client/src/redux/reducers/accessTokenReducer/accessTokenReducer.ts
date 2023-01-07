import {
  ACCESSTOKEN_REQUEST,
  ACCESSTOKEN_SUCCESS,
  ACCESSTOKEN_FAIL,
} from "../../types/types";
import { Action } from "../../action/actionAccessToken";

interface StateType {
  isLoading: boolean;
  errorMessage: null | string;
  accessToken:string | undefined
}

const initialState = {
  isLoading: false,
  errorMessage: null,
  accessToken:''
};

function accessTokenReducer(state: StateType = initialState, action: Action) {
  const { payload, type } = action;

  switch (type) {
    case ACCESSTOKEN_REQUEST:
      return {
        isLoading: true,
        errorMessage: null,
      };
    case ACCESSTOKEN_SUCCESS:
      return {
        isLoading: false,
        errorMessage: null,
        accessToken:payload.accessToken
      };
    case ACCESSTOKEN_FAIL:
      return {
        isLoading: false,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
}

export default accessTokenReducer;
