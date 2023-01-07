import {
  REQUESTCOMMENT,
  SUCCESSCOMENT,
  FAILDCOMMENT,
  INSERTCOMMENT,
  DELETECOMMENT,
} from "../../types/types";

import { Action } from "../../action/actionComments";
import { CommentType } from "../../../typeing";

interface typeState {
  comment: CommentType[]
  insert: number 
  delete: number 
  ErrorMassege:string
  isLoading: boolean
}
const INITIALSTATE = {
  comment: [],
  insert: 0,
  delete: 0,
  isLoading: false,
  ErrorMassege: "",
};

function commentReducer(state: typeState = INITIALSTATE, action: Action) {
  const { type } = action;
  switch (type) {
    case REQUESTCOMMENT:
      return {
        isLoading: true,
      };
    case SUCCESSCOMENT:
      return {
        ...state,
        comment: action?.payload.comment,
        insert: action?.payload.insert,
        delete: action?.payload.delete,
        isLoading: false,
        ErrorMassege: "",
      };
    case INSERTCOMMENT:
      return {
        ...state,
        insert: action?.payload?.insert,
        comment: action?.payload.comment,
        isLoading: false,
        ErrorMassege: "",
      };
    case DELETECOMMENT:
      return {
        ...state,
        insert: action?.payload?.delete,
        comment: action?.payload.comment,
        isLoading: false,
        ErrorMassege: "",
      };
      case FAILDCOMMENT:
        return {
          ...state,
          insert: action?.payload.insert,
          delete: action?.payload.delete,
          isLoading: false,
          ErrorMassege: action?.payload?.ErrorMassege,
        };
    default:
      return state;
  }
}

export default commentReducer;
