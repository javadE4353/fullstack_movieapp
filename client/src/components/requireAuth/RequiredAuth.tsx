import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import newAccessTokenAction from "../../redux/actionCreator/actionCreateAccessToken";

import { useEffect,useState } from "react";

import {StateTypeAuth, Userinfo} from "../../typeing"
import { Dispatch } from "redux";

//loader


interface accessToken{
  isLoading:boolean,
  errorMessage:null,
}

interface Props{
  allowedRoles:string[]
}

const RequiredAuth = ({ allowedRoles }:Props) => {
  const user = useSelector((state:StateTypeAuth) => state?.auth);
  const newAccessToken = useSelector((state:accessToken) => state);
  const location = useLocation();
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    if (!user?.accessToken) {
      // dispatch(newAccessTokenAction(dispatch))
    }
  }, []);
  useEffect(() => {
      console.log(user)
  }, [user?.isLoading]);
 
  // if (newAccessToken?.errorMessage) {
  //   // navigate("./login");
  //   console.log(newAccessToken?.errorMessage)
  // }
  return allowedRoles?.includes(user?.userInfo !== null?user?.userInfo.role:'') ? (
    <>
      <div className="">
        <Outlet />
      </div>
    </>
  ) : user?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
