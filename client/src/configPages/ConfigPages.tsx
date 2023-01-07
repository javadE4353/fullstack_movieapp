import { useEffect, useState } from "react";

//module external
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
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
import { getPublicCategory } from "../redux/actionCreator/actionCreateCategory";
import { getAllmovie } from "../redux/actionCreator/actionMovie";

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
const ConfigPages = () => {
  const [comedy, setComedy] = useState<number>(0);
  const [action, setAction] = useState<number>(0);

  const movies = useSelector((state: MoviesType) => state?.movies?.Allmovie);
  const mylist = useSelector((state: Mylist) => state?.mylist.mylist);
  const categorys = useSelector(
    (state: Categorys) => state?.categorys?.categorys
  );
  const dispatch: Dispatch<any> = useDispatch();
  const location = useLocation();
  const ROLES: Roles = {
    User: "user",
    Admin: "admin",
  };

  useEffect(() => {
    categorys?.map((item) => {
      if (item.bits == 28) setComedy(item.bits);
      if (item.bits == 80) setComedy(item.bits);
    });
  }, []);
  useEffect(() => {
    dispatch(getAllmovie());
    dispatch(getPublicCategory());
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {/* Route default */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="movie/:id" element={<Modal />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route
          path="/comedy"
          element={<Category movie={movies} gener={comedy} />}
        >
          <Route path="movie/:id" element={<Modal />} />
        </Route>
        <Route
          path="/action"
          element={<Category movie={movies} gener={action} />}
        >
          <Route path="movie/:id" element={<Modal />} />
        </Route>
        {/* Role Admin */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/dashboard" element={<Dashboard path={"admin"} />}>
            {/* TABLEUSERS */}
            <Route path="users" element={<ViewTableUser />}>
              <Route path="update/:id" element={<EditUser path={"users"} />} />
              <Route path="insert" element={<NewUser />} />
            </Route>
            {/* PROFILE */}
            <Route path="profile" element={<Profile />}>
              <Route path="edit/:id" element={<EditUser path={"profile"} />} />
            </Route>
            {/* TABLEMOVIES */}
            <Route path="movies" element={<TableMovies />} />
            <Route path="editmovie/:id" element={<UpdateMovie />} />
            <Route path="addmovie" element={<InsertMovie />} />
            {/* TABLECATEGORY */}
            <Route path="category" element={<TableCategory />}>
              <Route path="update/:id" element={<UpdateCategoryModal />} />
              <Route path="insert" element={<InsertCategoryModal />} />
            </Route>
            {/* MYLIST */}
            <Route path="mylist" element={<TableMovieMylist />}></Route>
            {/* NOTFOUNT */}
            <Route path="*" element={<Notfount />}></Route>
          </Route>
          <Route path="/account" element={<Account />}></Route>
          <Route
            path="/mylist"
            element={<Category movie={mylist} gener={categoryMovies?.mylist} />}
          >
            <Route path="movie/:id" element={<Modal />} />
          </Route>
        </Route>
        {/* Role User */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/dashboard/me" element={<Dashboard path={"user"} />}>
            <Route path="mylist" element={<TableMovieMylist />}></Route>
            <Route path="profile" element={<Profile />}>
              <Route path="edit/:id" element={<EditUser path={"profile"} />} />
            </Route>
            <Route path="*" element={<Notfount />}></Route>
          </Route>
          <Route path="create/account" element={<Account />}></Route>
          <Route
            path="/me/mylist"
            element={<Category movie={mylist} gener={categoryMovies?.mylist} />}
          >
            <Route path="movie/:id" element={<Modal />} />
          </Route>
        </Route>
        {/* Route Notfount */}
        <Route path="*" element={<Notfount />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default ConfigPages;
