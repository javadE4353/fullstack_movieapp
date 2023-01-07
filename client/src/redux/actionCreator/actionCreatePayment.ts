import {REQUESTPAYMENT,SUCCESSPAYMENT,GETPAYMENT,INSERTPAYMENT,FAILDPAYMENT} from "../types/types";
import {Payment} from '../../typeing'
import { BASE_URL } from "../../axios/configApi";
import axios, { AxiosInstance } from "axios";
  

interface Payload{
  payment:Payment[] | null
  ErrorMessage:string | null
}

  type MoviesAction = {
    type: string;
    payload:Payload
  };
  type DispatchType = (args: MoviesAction) => MoviesAction;
  
  export const getsubscription = (username: string, axiosPrivate: AxiosInstance) => {
    return async (dispatch: DispatchType) => {
      dispatch({ type: REQUESTPAYMENT,payload:{payment:null,ErrorMessage:null} });
      try {
        const response = await axiosPrivate.get(`${BASE_URL}account?username=${username}`);
        dispatch({
          type: GETPAYMENT,
          payload: response?.data?.data,
        });
      } catch (error) {
        dispatch({
          type: FAILDPAYMENT,
          payload:{payment:null,ErrorMessage:null}
        });
      }
    };
  };
  
  export const insertSubscription = (data:FormData,userid:number,amunt:number, axiosPrivate: AxiosInstance) => {
    return async (dispatch: DispatchType) => {
      dispatch({ type: REQUESTPAYMENT,payload:{payment:null,ErrorMessage:null} });
      try {
        const response = await axiosPrivate.post(`${BASE_URL}/account/${userid}`,data);
        dispatch({
          type: INSERTPAYMENT,
          payload:{payment:null,ErrorMessage:null}
        });

        if(response?.status === 201 || response?.status === 200){
            const Data = {
                amount: amunt,
                email: response?.data?.data.email,
                userId: response?.data?.data.userId,
                subscriptionId:response?.data?.data.id,
              };
              const res = await axiosPrivate.post("http://localhost:7000/api/v1/payment", Data);
              // console.log(res.data.authority)
              window.location.assign(
                `https://www.zarinpal.com/pg/StartPay/${res.data.authority}`
              );
              // console.log(res?.status)

                // if(res?.status === 200){
                //   const response = await axiosPrivate.get(`${BASE_URL}account?username=${username}`);
                //   dispatch({
                //     type: GETPAYMENT,
                //     payload: response?.data?.data,
                //   });
                // }
        }
        
      } catch (error) {
        // console.log(error)
        dispatch({
          type: FAILDPAYMENT,
          payload:{payment:null,ErrorMessage:null}
        });
      }
    };
  };
  