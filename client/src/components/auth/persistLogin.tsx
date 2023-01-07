import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import newAccessTokenAction from "../../redux/actionCreator/actionCreateAccessToken";

import {useEffect } from "react";
import { Dispatch } from "redux";
import {Userinfo} from "../../typeing"
interface StateTypeAuth {
  accessToken: string | null | undefined;
  userInfo: Userinfo  | null;
  isLoading: boolean;
  erroMessage: null;
}

interface accessToken{
  isLoading:boolean,
  errorMessage:null,
}

interface Props{
  allowedRoles:string[]
}

const PersistLogin = () => {
  const user = useSelector((state:StateTypeAuth) => state);
  const newAccessToken = useSelector((state:accessToken) => state);

  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user?.accessToken) dispatch(newAccessTokenAction());
  // }, []);

  // if (newAccessToken?.errorMessage) {
  //   navigate("./login");
  // }

  return (
    <>
      {/* <Bloader isLoading={newAccessToken?.isLoading} />
      {user?.accessToken && <Outlet />} */}
      <div>PersistLogin</div>
    </>
  );
};

export default PersistLogin