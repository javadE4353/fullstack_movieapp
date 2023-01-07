import { useEffect, useState } from "react";

//module external
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

//
import { getAllmovie } from "../redux/actionCreator/actionMovie";
import SliderItemHome from "../subcomponents/SliderItemHome";
import { Movies } from "../typeing";

//interface
interface MoviesType {
  movies: {
    movies: Movies[] 
    movie: Movies;
    Allmovie:Movies[]
    insert: number
    update: number
    delete: number
    isloading: boolean
    ErrorMessage: string 
  };
}

//component
const SliderHome: React.FC = () => {
  const [movie, setMovie] = useState<Movies | null>(null);
  const dispatch: Dispatch<any> = useDispatch();
  // const banner = useSelector((state: MoviesType) => state?.movies.movies);
  const banner = useSelector((state: MoviesType) => state?.movies?.Allmovie);

  useEffect(() => {
    dispatch(getAllmovie());
  }, []);

  useEffect(() => {
    if (banner) {
      setMovie(banner?.[Math.floor(Math.random() * banner.length)]);
    }
  }, [banner]);

  return (
    <>
      <SliderItemHome item={movie} />
    </>
  );
};

export default SliderHome;
