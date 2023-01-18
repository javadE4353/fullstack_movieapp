import { useState } from "react";

//module external
import { useRecoilState } from "recoil";
import { FaPlay } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//
import { Movies, StateTypeAuth } from "../typeing";
import { showAlert } from "../atoms/modalAtom";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";

//interface
interface Props {
  movie: Movies | null;
}

//component
const Card = ({ movie }: Props) => {
  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const user = useAppSelector((state: StateTypeAuth) => state?.auth);
  const [errorShowMovie, setErrorShowMovie] = useState<string>("");
  const loc = useLocation();
  const handleShowMovie = () => {
    if (user?.userInfo?.username) {
      setErrorShowMovie("");
      setShowAlert(false);
    } else {
      setErrorShowMovie(
        "برای مشاهده فیلم باید اشتراک داشته باشید یا در سایت ثبت نام کنید"
      );
      setShowAlert(true);
    }
  };

  return (
    <>
      <div onClick={() => handleShowMovie()}>
        <div className="relative w-[12rem] max-w-[100%] bg-black rounded-xl p-3 text-white m-5 flex flex-col  cursor-pointer text-xl hover:scale-110">
          <Link
            to={`movie/${
              loc.pathname.includes("mylist") ? movie?.movieid : movie?.id
            }`}
          >
            <div className="transition rounded-2xl h-full w-full ease-in-out absolute top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center opacity-0 -translate-y-100 -z-1  hover:translate-y-0 duration-700 hover:z-40 duration-100 hover:opacity-100 duration-100">
              <button className="btn btn-sm relative z-40">
                <FaPlay />
              </button>
              <div className="absolute bottom-0 text-red-600 z-40 font-bold flex items-start justify-start">
                <div className="flex flex-col items-start justify-start">
                  <h3 className="my-1 text-red-600">{movie?.title}</h3>
                  <h3 className="my-1 text-red-600">
                    ⭐{movie?.vote_average}/10
                  </h3>
                </div>
              </div>
              <div className="absolute z-30 top-0 left-0 bottom-0 right-0 rounded-2xl  h-full w-full opacity-80 bg-black"></div>
            </div>
            <LazyLoadImage
              src={`${movie?.poster_path}`}
              className="img-lazy rounded-2xl h-full"
              placeholderSrc={`${movie?.title}`}
              effect="blur"
            />
          </Link>
          <h3 className="my-1">{movie?.title}</h3>
          <h3 className="my-1">⭐{movie?.vote_average}/10</h3>
        </div>
      </div>
    </>
  );
};

export default Card;
