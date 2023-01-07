import {useEffect, useState} from "react"

//module external
import { useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { modalEditUser } from "../atoms/modalAtom";
import { HiEllipsisVertical } from "react-icons/hi2";
import { motion } from "framer-motion";
import * as timeago from "timeago.js/lib/index";
import {Link, Outlet} from 'react-router-dom'
//
import { StateTypeAuth, Users } from "../typeing";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import {getUsers } from "../redux/actionCreator/actionCreateUsers";

//interface
interface State {
  users: {
    users: Users[];
    count: number;
    insert: number;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}

//component
const Profile = () => {
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const stateUsers = useSelector((state: State) => state?.users);
  const [users,setUser]=useState<Users[]>([])
  const dispatch: Dispatch<any> = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
      if(user?.userInfo?.id){
        dispatch(getUsers(axiosPrivate,{}));
      }
  }, [])
  useEffect(() => {
  if(stateUsers?.users && user?.userInfo){
    const USER=stateUsers?.users.filter(U => U.id == user?.userInfo?.id)
    setUser(USER || [])
  }
  }, [stateUsers?.users])
  return (
    <motion.div
      initial={{ opacity: 0,}}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
        <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">

               <span>{timeago?.format(users[0]?.createdAt || "2022-10-25")}</span>
            </span>
            <Link
             to={`edit/${user?.userInfo?.id}`}
              className="text-emerald-400"
             
            >
              <HiEllipsisVertical size={25} />
            </Link>
          </div>
          <div className="mt-6 w-fit mx-auto">
            <img
              src={
                users[0]?.image ||
                "https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
              }
              className="rounded-full w-28 "
              alt="profile picture"
            />
          </div>

          <div className="mt-8 ">
            <h2 className="text-white font-bold text-2xl tracking-wide">
              {user?.userInfo?.username}
            </h2>
          </div>
          <p className="text-emerald-400 font-semibold mt-2.5">
            {user?.userInfo?.role}
          </p>

           {/* <div className="h-1 w-full bg-black mt-8 rounded-full">
            <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
          </div> */}
          {
            timeago.format(users[0]?.updatedAt || "").includes("just")?
          <div className="mt-3 text-white text-sm text-center">
            <span className="text-gray-400 font-semibold">ویرایش انجام شد</span>
          </div> 
            :
            null
          }
        </section>
      </section>
      <Outlet/>
    </motion.div>
  );
};

export default Profile;
