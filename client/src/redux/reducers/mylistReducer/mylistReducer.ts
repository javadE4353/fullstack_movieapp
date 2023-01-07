import {
  INSERTMYLIST,
  REQUESTFAILDMYLIST,
  REQUESTSECCESSMYLIST,
  REQUESTMYLIST,
  REMOVEMYLIST,
} from "../../types/types";

import { Action } from "../../action/actionMylist";
import { Movies } from "../../../typeing";

interface MovieType {
  mylist: Movies[];
  count:number
  delete:number
  insert:number
  isloading: boolean;
}

const initialState = {
  mylist: [],
  count:0,
  delete:0,
  insert:0,
  isloading: false,
};

const mylistReducer = (state: MovieType = initialState, action: Action) => {
  const { type } = action;

  switch (type) {
    case REQUESTMYLIST:
      return {
        isloading: true,
      };
      break;
    case REQUESTSECCESSMYLIST:
      return {
        mylist: action?.payload.mylist,
        count: action?.payload.count,
        delete: action?.payload.delete,
        insert: action?.payload.insert,
        isloading: false,
      };
      break;
    case INSERTMYLIST:
      return {
        insert: action?.payload.insert,
        isloading: false,
      };
      break;
    case REMOVEMYLIST:
      return {
        delete: action?.payload.delete,
        isloading: false,
      };
      break;
    case REQUESTFAILDMYLIST:
      return {
        isloading: false,
      };
      break;

    default:
      return state;
      break;
  }
};

export default mylistReducer;
