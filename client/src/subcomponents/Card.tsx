import { useState } from "react";

//module external
import { useRecoilState } from "recoil";
import { useSelector } from "react-redux";

//
import { Movies, StateTypeAuth } from "../typeing";
import { showAlert } from "../atoms/modalAtom";
import { Link, useLocation } from "react-router-dom";

//interface
interface Props {
  movie: Movies | null;
}

//component
const Card = ({ movie }: Props) => {

  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const [errorShowMovie, setErrorShowMovie] = useState<string>("");
 const loc =useLocation()
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
        <div className="w-[21rem] max-w-[100%] bg-black rounded-xl p-3 text-white m-5 flex flex-col  cursor-pointer text-xl hover:scale-110">
           <Link to={`movie/${loc.pathname.includes("mylist")?movie?.movieid:movie?.id}`}>
           <img
            className="w-full self-center rounded-lg h-[476px]"
            src={"https://image.tmdb.org/t/p/original/" + movie?.poster_path}
            alt="poster"
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
