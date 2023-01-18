import { Outlet, Navigate, useLocation } from "react-router-dom";


import { StateTypeAuth } from "../../typeing";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

//loader

interface Props {
  allowedRoles: string[];
}

const RequiredAuth = ({ allowedRoles }: Props) => {
  const user = useAppSelector((state: StateTypeAuth) => state?.auth);
  const location = useLocation();
  return allowedRoles?.includes(
    user?.userInfo !== null ? user?.userInfo.role : ""
  ) ? (
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
