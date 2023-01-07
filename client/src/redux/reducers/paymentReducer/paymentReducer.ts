
import {REQUESTPAYMENT,SUCCESSPAYMENT,GETPAYMENT,INSERTPAYMENT,FAILDPAYMENT} from "../../types/types";

    
import { Action } from "../../action/actionpayment";
import {Payment} from "../../../typeing"

interface Account {
  payment:Payment[] | null;
  isloading: boolean;
  ErrorMessage:string | null
}

const initialState = {
    payment: null,
  isloading: false,
  ErrorMessage:null
};

const paymentReducer = (state: Account = initialState, action: Action) => {
  const { type} = action;

  switch (type) {
    case REQUESTPAYMENT:
      return {
        isloading: true,
      };
      break;
    case SUCCESSPAYMENT:
      return {
        isloading: false,
      };
      break;
    case GETPAYMENT:
      return {
        payment: action?.payload,
        isloading: false,
      };
      break;
    case INSERTPAYMENT:
      return {
        isloading: false,
      };
      break;
    case FAILDPAYMENT:
      return {
        ErrorMessage:action?.payload?.ErrorMessage,
        isloading: false,
      };
      break;
    default:
      return state;
      break;
  }
};

export default paymentReducer;
