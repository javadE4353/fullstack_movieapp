import { axiospublic } from "../axios/configApi";
import { ACCESSTOKEN_SUCCESS, REFRESH_ACCESSTOKEN } from "../redux/types/types";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

const useRefreshToken = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const refresh = async () => {
    try {
      const { data } = await axiospublic.get("/auth/refreshtoken", {
        withCredentials: true,
      });
      dispatch({
        type: REFRESH_ACCESSTOKEN,
        payload: {
          accessToken: data?.data.accessToken,
          userInfo: data?.data.userInfo,
        },
      });
      // dispatch({
      //   type: ACCESSTOKEN_SUCCESS,
      //   payload:{
      //     accessToken:data?.data.accessToken,
      //     errorMessage:null
      //   }
      // });

      return data?.data.accessToken;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
