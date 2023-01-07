import { useEffect, useState } from "react";

//module external
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { motion } from "framer-motion";

//
import { getAllmovie } from "./redux/actionCreator/actionMovie";
import baseUrl from "./axios/configApi";
import newAccessTokenAction from "./redux/actionCreator/actionCreateAccessToken";
import ConfigPages from "./configPages/ConfigPages";
import { Movies, StateAccessToken } from "./typeing";

import getCategorys, { getPublicCategory } from "./redux/actionCreator/actionCreateCategory";
interface MoviesType {
  movies: {
    Allmovie: Movies[] | null;
  };
}
const App: React.FC = () => {
  const [movie, setMovie] = useState<Movies[]>([]);
  const movies = useSelector((state: MoviesType) => state?.movies?.Allmovie);
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(getAllmovie());
    dispatch(getPublicCategory());
    dispatch(newAccessTokenAction(dispatch));
  }, []);

  useEffect(() => {
    if (movies) {
      setMovie(movies);
    }
  }, [movies]);
  return (
    <>
    <ConfigPages />
      {/* {movie.length > 0 ? (
        <ConfigPages />
      ) : (
        <motion.div
          className="h-140 w-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity:0 }}
        >
          <img
            src={`${baseUrl.originalImage}/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg`}
            className="object-cover h-auto w-full "
            alt=""
          />
        </motion.div>
      )} */}
    </>
  );
};

export default App;
