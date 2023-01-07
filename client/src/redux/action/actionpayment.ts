import {REQUESTPAYMENT,SUCCESSPAYMENT,GETPAYMENT,INSERTPAYMENT,FAILDPAYMENT} from "../types/types";
import {Payment} from '../../typeing'


interface requestPayment{
  type: "REQUESTPAYMENT";
}
interface successPayment{
  type: "SUCCESSPAYMENT";
}
interface getPayment {
  type: "GETPAYMENT";
  payload:Payment[]
}
interface insertPayment {
  type: "INSERTPAYMENT";
}
interface faildPayment {
  type: "FAILDPAYMENT";
  payload:{ErrorMessage:string}
}

export type Action = requestPayment| successPayment| faildPayment | insertPayment | getPayment;