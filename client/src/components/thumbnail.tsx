//module external
import { useRecoilState } from "recoil";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//
import { showAlert } from "../atoms/modalAtom";
import { Movies, StateTypeAuth, Userinfo } from "../typeing";

//interface
interface Props {
  movie: Movies | null;
  category:number
}

//component
function Thumbnail({ movie,category }: Props) {
  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const navigate = useNavigate();
  const handleShowMovie = () => {
    if (user?.userInfo?.username && movie) {
      setShowAlert(false);
      navigate(`movie/${category===1?movie.movieid:movie.id}`);
    } else {
      setShowAlert(true);
    }
  };
  return (
    <>
      <div
        className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
        onClick={() => handleShowMovie()}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
          className="rounded-sm object-cover md:rounded"
        />
      </div>
    </>
  );
}

export default Thumbnail;
