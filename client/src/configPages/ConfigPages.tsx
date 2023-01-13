import { useEffect, useState } from "react";

//module external
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
//type
import { Movies } from "../typeing";
//components
import Dashboard from "../components/Dashboard";
import Unauthorized from "../components/unauthorized/Unauthorized";
import Notfount from "../components/Notfount";
import Account from "../components/Account";
import ViewTableUser from "../subcomponents/ViewTableUser";
import TableMovieMylist from "../subcomponents/TableMovieMylist";
import Profile from "../components/Profile";
import Home from "../pages/Home";
import RequiredAuth from "../components/requireAuth/RequiredAuth";
import Category from "../components/Category";
import Modal from "../components/Modal";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TableMovies from "../components/TableMovies";
import { categoryMovies } from "../data/category";
import InsertMovie from "../components/InsertMovie";
import InsertCategoryModal from "../subcomponents/ModalCategoryInsert";
import UpdateMovie from "../components/UpdateMovie";
import UpdateCategoryModal from "../subcomponents/ModalCategoryupdate";
import TableCategory from "../components/TableCategory";
import EditUser from "../components/EditeUser";
import NewUser from "../components/Newuser";


// interface
interface Roles {
  User: string;
  Admin: string;
}

interface Mylist {
  mylist: { mylist: Movies[] };
}
interface MoviesType {
  movies: {
    movie: Movies[];
    Allmovie: Movies[];
    insert: number;
    update: number;
    delete: number;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}
interface Cat {
  name: string;
  bits: number;
  image: string;
  content: string;
}

interface Categorys {
  categorys: {
    categorys: Cat[];
    update: number;
    delete: number;
    insert: number;
    isloading: boolean;
    ErrorMassege: string | null;
  };
}

//COMPONENT
const ConfigPages = () => {
  const [comedy, setComedy] = useState<number>(0);
  const [action, setAction] = useState<number>(0);

  //stateRedux
  // const movies = useSelector((state: MoviesType) => state?.movies?.Allmovie);
  // const mylist = useSelector((state: Mylist) => state?.mylist.mylist);
  // const categorys = useSelector(
  //   (state: Categorys) => state?.categorys?.categorys
  // );
  //
  const location = useLocation();

  //Roles
  const ROLES: Roles = {
    User: "user",
    Admin: "admin",
  };

  //useEffect
  // useEffect(() => {
  //   categorys?.map((item) => {
  //     if (item.bits == 28) setComedy(item.bits);
  //     if (item.bits == 80) setComedy(item.bits);
  //   });
  // }, []);

  //return
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {/* Route default */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
     </Routes>
    </AnimatePresence>
  );
};

export default ConfigPages;
