import { useEffect, useState } from "react";

//module external
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { motion } from "framer-motion";

//
import { getAllmovie } from "./redux/actionCreator/actionMovie";
import newAccessTokenAction from "./redux/actionCreator/actionCreateAccessToken";
import ConfigPages from "./configPages/ConfigPages";
import { Movies } from "./typeing";

import{ getPublicCategory } from "./redux/actionCreator/actionCreateCategory";
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
    </>
  );
};

export default App;
