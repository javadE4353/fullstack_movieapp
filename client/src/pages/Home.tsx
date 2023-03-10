import { useEffect, useState, CSSProperties } from "react";

//module external
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import MuiModal from "@mui/material/Modal";
import { motion } from "framer-motion";
import { BsX } from "react-icons/bs";
import { Movies, StateTypeAuth } from "../typeing";
import { Outlet, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

//
import Header from "../components/Header";
import Row from "../components/Row";
import Sidebar from "../components/Saidebar";
import SliderHome from "../components/slider";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import { getAllmylist } from "../redux/actionCreator/actionCreateMylist";
import NavigationBottom from "../subcomponents/NavigationBottom";

// interface
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  right: "44%",
};

interface togglesidebar {
  sidebar: { toggle: boolean };
}

interface MoviesType {
  movies: {
    Allmovie: Movies[];
  };
}
interface Mylist {
  mylist: { mylist: Movies[]; isloading: boolean };
}

interface Cat {
  title: string;
  bits: number;
  image: string;
  content: string;
}

interface Categorys {
  categorys: {
    categorys: Cat[];
    categoryPublic: Cat[];
    update: number;
    delete: number;
    insert: number;
    isloading: boolean;
    ErrorMassege: string | null;
  };
}

const Home: React.FC = () => {
  let [color, setColor] = useState("#ffffff");
  const [showalret, setShowAlert] = useState(true);
  const [cat, setCat] = useState<Cat[]>([]);
  const [banner, setBanner] = useState<Movies>();

  //
  const mylist = useSelector((state: Mylist) => state?.mylist);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const toggle = useSelector((state: togglesidebar) => state?.sidebar?.toggle);
  const categorys = useSelector((state: Categorys) => state?.categorys?.categoryPublic);
//
  const dispatch: Dispatch<any> = useDispatch();
  const movies = useSelector((state: MoviesType) => state?.movies.Allmovie);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  //useEffect
  useEffect(() => {
    if (user?.accessToken && user?.userInfo?.id) {
      // dispatch(getAllmylist(axiosPrivate, user?.userInfo?.id, {}));
    }
  }, [location?.pathname]);
  //
  useEffect(() => {
    const cat = categorys?.filter((item) => {
      if (item.bits !== 1 && item.bits !== 100) {
        return item;
      }
    });
    if (cat?.length > 0) setCat(cat);
  }, [categorys,location.pathname]);
//
  useEffect(() => {
    if (movies) {
      setBanner(movies?.[Math.floor(Math.random() * movies.length)]);
    }
  }, [movies,location.pathname]);
  console.log(categorys)
  console.log(cat)
  console.log(movies)
  //return
  return (
    <>
      {cat?.length>0 ? (
        <div className="relative h-auto bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-auto overflow-hidden">
          <Header />
          <div
            className={`fixed top-0 z-[999] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${
              showalret ? "block" : "hidden"
            }`}
          >
            <strong className="font-bold">?????? ???????? ?? ?????? ????????????:??????????</strong>
            <span className="block sm:inline">
              <span className="mx-2">?????? ????????????:????????</span>
              <span>?????? ????????:%$@G1234</span>
            </span>
            <span
              className="absolute top-0 bottom-0 left-0 px-4 py-3"
              onClick={() => setShowAlert(false)}
            >
              <BsX className="text-red-400" />
            </span>
          </div>
          <main className="relative pl-4 lg:pl-16">
            <>
              <div className={`${toggle ? "block" : "hidden"}`}>
                {user?.userInfo && <Sidebar role={user.userInfo.role} />}
              </div>
              {banner && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SliderHome banner={banner} />
                </motion.div>
              )}
              <section className="md:space-y-24">
                {cat?.length > 0
                  ? cat?.map((item, i) => (
                      <Row
                        key={i}
                        title={item?.title}
                        movies={movies}
                        category={item?.bits}
                      />
                    ))
                  : null}
                {user?.accessToken ? (
                  <>
                    {mylist?.mylist?.length > 0
                      ? categorys?.map((item, i) => (
                          <>
                            {item?.bits === 1 && (
                              <Row
                                title={item?.title}
                                movies={mylist?.mylist}
                                category={item?.bits}
                              />
                            )}
                          </>
                        ))
                      : null}
                  </>
                ) : null}
              </section>
            </>
          </main>
          {user?.accessToken && <Outlet />}
          <NavigationBottom />
        </div>
      )
      :
      <>
     <MuiModal
        open={true}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
      <ClipLoader
          color={color}
          loading={true}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
     </MuiModal>
      </>
      }
    </>
  );
};

export default Home;
