//module external
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {LazyLoadImage} from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
//
import { showAlert } from "../atoms/modalAtom";
import { Movies, StateTypeAuth, Userinfo } from "../typeing";
import { useAppSelector, useAppDispatch } from "../app/hooks";

//interface
interface Props {
  movie: Movies | null;
  category:number
}
const generateArray=(items:number)=>[...Array.from(Array(items))]
//component
function Thumbnail({ movie,category }: Props) {
  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const user = useAppSelector((state: StateTypeAuth) => state?.auth);
  const navigate = useNavigate();
  const handleShowMovie = () => {
    if (user?.userInfo?.username && movie) {
      setShowAlert(false);
      navigate(`movie/${category===1?movie.movieid:movie.id}`);
    } else {
      toast("برای مشاهده فیلم در سایت ثبت نام کنید", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      setShowAlert(true);
    }
  };
  return (
    <>
      <div
        className={`relative cursor-pointer transition duration-200 ease-out md:hover:scale-105`}
        onClick={() => handleShowMovie()}
      >
        <div className="transition ease-in-out absolute top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center opacity-0 -translate-y-100 -z-1  hover:translate-y-0 duration-700 hover:z-40 duration-100 hover:opacity-100 duration-100">
        <button className=" bg-red-400 py-1 px-8 opacity-100 rounded-lg relative z-40">تماشا</button>
        <div className="absolute z-30 top-0 left-0 bottom-0 right-0  h-full w-full opacity-60 bg-neutral-700"></div>
        </div>
        <LazyLoadImage
          src={`${movie?.poster_path}`}
          className="img-lazy"
          placeholderSrc={`${movie?.title}`}
          effect="blur"
          />
      </div>
    </>
  );
}

export default Thumbnail;
