import {
    REQUESTUSER,
    GETUSERS,
    GETUSER,
    INCERTUSER,
    UPDATEUSER,
    DELETEUSER,
    FAILREQUESTUSER,
  } from "../types/types";
  import {NewUser, Users} from "../../typeing"
import { AxiosInstance } from "axios";
import { BASE_URL } from "../../axios/configApi";

  interface Payload{
   users:Users[] | null
   count:number
   update:number
   insert:number
   delete:number
   ErrorMessage:string | null
  }
  interface Option{
    page?:number
    pageSize?:number
    userid?:number
    search?:string
    role?:string
  }
  type UsersDispatch = {
      type: string
      payload?: Payload
    }
  type DispatchType = (args: UsersDispatch) => UsersDispatch
  export const getUsers = (axiosPrivate: AxiosInstance,option:Option) => {
    const url = `${BASE_URL}/users`;
    let baseUrl = "";    
    if (option?.role && option?.page) {
      baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&role=${option?.role}`;
    } 
    else if (option?.role && !option?.page) {
      baseUrl = `${url}?role=${option?.role}`;
    } 
     else if (option?.search && option?.page && option?.pageSize) {
      baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&search=${option?.search}`;
    } 
     else if (option?.search && !option?.page) {
      baseUrl = `${url}?search=${option?.search}`;
    } 
     else if (option?.pageSize && option?.page) {
      baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}`;
    } 
    else if (
      Object.keys(option).length < 1 ||
      option == null ||
      option == undefined
    ) {
      baseUrl = `${url}`;
    }
    console.log(baseUrl)
    return async (dispatch:DispatchType) => {
      dispatch({ type: REQUESTUSER});
      try {
        const response = await axiosPrivate.get(`${baseUrl}`);
        dispatch({
          type: GETUSERS,
          payload:{users:response?.data?.data?.[0],ErrorMessage:null,count:response?.data?.data?.[1]?.count.count,insert:0,update:0,delete:0}
        });
        // console.log(response)
      } catch (error) {
        let ErrorMsg='error'
        dispatch({
          type: FAILREQUESTUSER,
          payload:{users:null,ErrorMessage:ErrorMsg,count:0,insert:0,update:0,delete:0}
        });
      }
    };
  };
  


  interface PayloadDelete{
    users?:Users[] 
    count?:number
    delete:number
    ErrorMessage:string | null
   }
 
   type UsersDispatchDelete = {
       type: string
       payload?: PayloadDelete
     }
   type DispatchTypeDelete = (args: UsersDispatchDelete) => UsersDispatchDelete

  export const deleteUser = (axiosPrivate: AxiosInstance,id:number,page=1,pageSize=5) => {
    return async (dispatch:DispatchTypeDelete) => {
      dispatch({ type: REQUESTUSER });
      try {
        dispatch({
          type: DELETEUSER,
          payload:{delete:102,ErrorMessage:null}
        });
        const response = await axiosPrivate.delete(`${BASE_URL}/users/${id}`);
        dispatch({
          type: DELETEUSER,
          payload:{delete:response?.data?.data?.[0],ErrorMessage:null}
        });
        if(response?.status === 200){
          const response = await axiosPrivate.get(`${BASE_URL}/users?page=${page}&pageSize=${pageSize}`);
          dispatch({
            type: GETUSERS,
            payload:{users:response?.data?.data?.[0],ErrorMessage:null,count:response?.data?.data?.[1]?.count,delete:0}
          });
          // console.log(response)
        }
        // console.log(response)
      } catch (error) {
        let ErrorMsg='error'
        dispatch({
          type: FAILREQUESTUSER,
          payload:{ErrorMessage:ErrorMsg,delete:0}
        });
      }
    };
  };




  interface PayloadUser{
    user:Users[] | null
    update:number
    ErrorMessage:string | null
   }
 
   type UsersDispatchUser = {
       type: string
       payload?: PayloadUser
     }
   type DispatchTypeUser = (args: UsersDispatchUser) => UsersDispatchUser



  export const getUser = (axiosPrivate: AxiosInstance,id:number) => {
    return async (dispatch:DispatchTypeUser) => {
      dispatch({ type: REQUESTUSER });
      try {
        const response = await axiosPrivate.get(`${BASE_URL}/users/find/${id}`);
        dispatch({
          type: GETUSER,
          payload:{user:response?.data?.data,ErrorMessage:null,update:0}
        });
        // console.log(response?.data?.data)
      } catch (error) {
        let ErrorMsg='error'
        dispatch({
          type: FAILREQUESTUSER,
          payload:{ErrorMessage:ErrorMsg,user:null,update:0}
        });
      }
    };
  };



  interface PayloadInsert{
    insert:number
    ErrorMessage:string | null
   }
 
   type UsersDispatchInsert = {
       type: string
       payload?: PayloadInsert
     }
   type DispatchTypeInsert = (args: UsersDispatchInsert) => UsersDispatchInsert
  
  export const insertUser = (axiosPrivate: AxiosInstance,newUser:FormData) => {
    return async (dispatch:DispatchTypeInsert) => {
      dispatch({ type: REQUESTUSER });
      try {
        dispatch({
          type: INCERTUSER,
          payload:{insert:102,ErrorMessage:null}
        });
        const response = await axiosPrivate.post(`${BASE_URL}/users`,newUser);
        dispatch({
          type: INCERTUSER,
          payload:{insert:response?.data?.data[0],ErrorMessage:null}
        });
        // console.log(response)
      } catch (error) {
        let ErrorMsg='error'
        dispatch({
          type: FAILREQUESTUSER,
          payload:{ErrorMessage:ErrorMsg,insert:0}
        });
      }
    };
  };


    interface PayloadUpdate{
    update:number
    ErrorMessage:string | null
   }
 
   type UsersDispatchUpdate = {
       type: string
       payload?: PayloadUpdate
     }
   type DispatchTypeUpdate = (args: UsersDispatchUpdate) => UsersDispatchUpdate


  export const updateUser = (axiosPrivate: AxiosInstance,newUser:FormData,id:number) => {
    return async (dispatch:DispatchTypeUpdate) => {
      dispatch({ type: REQUESTUSER });
      try {
        dispatch({
          type: UPDATEUSER,
          payload:{update:102,ErrorMessage:null}
        });
        const response = await axiosPrivate.put(`${BASE_URL}/users/${id}`,newUser);
        // console.log(response?.data[0])
        dispatch({
          type: UPDATEUSER,
          payload:{update:response?.data?.[0],ErrorMessage:null}
        });
      } catch (error:any) {
        // console.log(error)
          let ErrorMessage='';
          if(error?.response?.status === 401){
           ErrorMessage=" اطلاعات وارد شده صحیح نمیباشد"
          }
          if(error?.response?.status === 409){
           ErrorMessage="نام کاربری وجود دارد"
          }
          if(error?.response?.status !== 409 && error?.response?.status !== 401){
           ErrorMessage=" لطفا بعدا دوباره امتحان کنید"
          }
        dispatch({
          type: FAILREQUESTUSER,
          payload:{ErrorMessage:ErrorMessage,update:0}
        });
      }
    };
  };
  
  
