import {
  REQUESCATEGORY,
  GETCATEGORY,
  INSERTCATEGORY,
  UPDATECATEGORY,
  DELETECATEGORY,
  GETCATEGORYPUBLIC,
  FAILCATEGORY,
} from "../types/types";
import { axiospublic, BASE_URL } from "../../axios/configApi";
import { AxiosInstance } from "axios";

interface Cat {
  name: string;
  bits: number;
  image: string;
  content: string;
  createdAt:string
  updatedAt:string
  username:string
}
interface payload {
  categorys: Cat[] | null;
  count:number
  update: number;
  delete: number;
  insert: number;
  ErrorMassege: string | null;
}

type Categorys = {
  type: string;
  payload?: payload;
};

interface Option{
  page?:number
  pageSize?:number
  bits?:number
  userid?:number
  search?:string
}

type DispatchType = (args: Categorys) => Categorys;

const getCategorys = (axiosPrivate:AxiosInstance,option:Option) => {
  const url = `${BASE_URL}/category`;
  let baseUrl = "";

  if (option?.userid && option?.bits) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&userid=${option?.userid}&bits=${option?.bits}`;
  } else if (option?.userid) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&userid=${option?.userid}`;
  }
   else if (option?.bits) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&bits=${option?.bits}`;
  } 
   else if (option?.search && option?.page && option?.pageSize) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}&search=${option?.search}`;
  } 
   else if (option?.search) {
    baseUrl = `${url}?search=${option?.search}`;
  } 
   else if (option?.page && option?.pageSize && !option?.bits && !option?.userid) {
    baseUrl = `${url}?page=${option?.page}&pageSize=${option?.pageSize}`;
  } 
  else if (
    Object.keys(option).length < 1 ||
    option == null ||
    option == undefined
  ) {
    baseUrl = `${url}`;
  }
  // console.log(baseUrl)
  return async (dispatch: DispatchType) => {
    dispatch({ type: REQUESCATEGORY });
    try {
      const response = await axiosPrivate.get(`${baseUrl}`);
      dispatch({
        type: GETCATEGORY,
        payload: {
          insert: 0,
          update: 0,
          delete: 0,
          categorys: response?.data?.data?.categorys,
          count: response?.data?.data?.count?.count,
          ErrorMassege: null,
        },
      });
      console.log(response)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: FAILCATEGORY,
        payload: {
          insert: 0,
          update: 0,
          delete: 0,
          categorys: null,
          count:0,
          ErrorMassege: ErrorMsg,
        },
      });
    }
  };
};



// insert category


interface payloadInsert {
  insert: number;
  ErrorMassege: string | null;
}

type CategorysInsert = {
  type: string;
  payload?: payloadInsert;
};
type DispatchTypeInsert = (args: CategorysInsert) => CategorysInsert;

export const insertCaegory = (axiosPrivate:AxiosInstance,data:FormData,userid:number) => {
  
  return async (dispatch: DispatchTypeInsert) => {
    dispatch({ type: REQUESCATEGORY ,payload:{insert:102,ErrorMassege:null}});
    try {
      const response = await axiosPrivate.post(`${BASE_URL}/category?userid=${userid}`,data);
      if(response?.status === 201){
        dispatch({
          type: INSERTCATEGORY,
          payload: {
            insert: 201,
            ErrorMassege: null,
          },
        });
      }
      // console.log(response)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: FAILCATEGORY,
        payload: {
          insert: 0,
          ErrorMassege: ErrorMsg,
        },
      });
    }
  };
};
// update category


interface payloadUpdate {
  update: number;
  ErrorMassege: string | null;
}

type CategoryUpdate = {
  type: string;
  payload?: payloadUpdate;
};
type DispatchTypeUpdate = (args: CategoryUpdate) => CategoryUpdate;

export const updateCategory = (axiosPrivate:AxiosInstance,data:FormData,userid:number,bits:number) => {
  
  return async (dispatch: DispatchTypeUpdate) => {
    dispatch({ type: REQUESCATEGORY ,payload:{update:102,ErrorMassege:null}});
    try {
      const response = await axiosPrivate.put(`${BASE_URL}/category?userid=${userid}&bits=${bits}`,data);
      if(response?.status === 20){
        dispatch({
          type: UPDATECATEGORY,
          payload: {
            update: 200,
            ErrorMassege: null,
          },
        });
      }
      // console.log(response)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: FAILCATEGORY,
        payload: {
          update: 0,
          ErrorMassege: ErrorMsg,
        },
      });
    }
  };
};
// delete category


interface payloadDelete {
  delete: number;
  ErrorMassege: string | null;
}

type CategoryDelete = {
  type: string;
  payload?: payloadDelete;
};
type DispatchTypeDelete = (args: CategoryDelete) => CategoryDelete;

export const deleteCatgory = (axiosPrivate:AxiosInstance,bits:number,userid:number) => {

  return async (dispatch: DispatchTypeDelete) => {
    dispatch({ type: REQUESCATEGORY ,payload:{delete:102,ErrorMassege:null}});
    try {
      const response = await axiosPrivate.delete(`${BASE_URL}/category?userid=${userid}&bits=${bits}`);
      if(response?.status === 200){
        dispatch({
          type: DELETECATEGORY,
          payload: {
            delete: 200,
            ErrorMassege: null,
          },
        });
      }
      // console.log(response)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: FAILCATEGORY,
        payload: {
          delete: 0,
          ErrorMassege: ErrorMsg,
        },
      });
    }
  };
};
// GETCATEGORYPUBLIC


interface payloadgetPublic {
  categoryPublic: Cat[] | null;
  ErrorMassege: string | null;
}

type CategoryGetPublic = {
  type: string;
  payload?: payloadgetPublic;
};
type DispatchTypegetPublic = (args: CategoryGetPublic) => CategoryGetPublic;

export const getPublicCategory = () => {

  return async (dispatch: DispatchTypegetPublic) => {
    dispatch({ type: REQUESCATEGORY });
    try {
      const response = await axiospublic.get(`${BASE_URL}/category`);
      if(response?.status === 200){
        dispatch({
          type: GETCATEGORYPUBLIC,
          payload: {
            categoryPublic:response?.data?.data?.categorys,
            ErrorMassege: null,
          },
        });
      }
      console.log(response)
    } catch (error) {
      let ErrorMsg = "error";
      dispatch({
        type: FAILCATEGORY,
        payload: {
          categoryPublic: null,
          ErrorMassege: ErrorMsg,
        },
      });
    }
  };
};


export default getCategorys;
