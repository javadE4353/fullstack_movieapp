import { useState } from "react";

//module external
import { useRecoilState } from "recoil";
import { FaPlay } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { HiOutlineXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//
import { showAlert } from "../atoms/modalAtom";
import baseUrl from "../axios/configApi";
import { Movies, StateTypeAuth } from "../typeing";

//interface
interface Props {
  item: Movies | null;
}

const SliderItemHome = ({ item }: Props) => {
  const [errorShowMovie, setErrorShowMovie] = useState<string>("");
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const navigate = useNavigate();

  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const handleShowMovie = (id: number | null) => {

    if (user?.userInfo?.username && id) {
      setErrorShowMovie("");
      setShowAlert(false);
      navigate(`/movie/${id}`);
    } else {
      setErrorShowMovie(
        "برای مشاهده فیلم باید اشتراک داشته باشید یا در سایت ثبت نام کنید"
      );
      setShowAlert(true);
    }
  };
  return (
    <>
      <div
        className={`fixed top-0 z-[999] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${
          showalret ? "block" : "hidden"
        }`}
      >
        <strong className="font-bold">اشتراک!</strong>
        <span className="block sm:inline">{errorShowMovie}</span>
        <span
          className="absolute top-0 bottom-0 left-0 px-4 py-3"
          onClick={() => setShowAlert(false)}
        >
          <HiOutlineXMark size={25} />
        </span>
      </div>

      <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
          {item ? (
            <img
              src={`${baseUrl.originalImage}${ item?.poster_path}`}
              className="object-cover"
              alt=""
            />
          ) : (
            <img
              src={`${baseUrl.originalImage}/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg`}
              className="object-cover"
              alt=""
            />
          )}
        </div>
        <h1 className="text-white text- text-2xl font-bold md:text-4xl lg:text-7xl xs:text-sm pr-3">
          {item?.title || item?.original_title}
        </h1>
        <p className=" text-white max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl pr-3">
          {item?.overview.slice(0, 100)}
        </p>

        <div className="flex space-x-3 pr-3">
          <button
            className="ml-2 bannerButton bg-transparent text-white border border-red-500 rounded-md"
            onClick={() => handleShowMovie(item?.id ? item?.id : null)}
          >
            <FaPlay className="h-4 w-4 text-red md:h-7 md:w-7" />
            نمایش
          </button>

          <button
            className="mr-4 bannerButton bg-transparent border border-red-500 rounded-md "
            onClick={() => handleShowMovie(item?.id ? item?.id : null)}
          >
            <HiOutlineInformationCircle className="h-5 w-5 md:h-8 md:w-8" />
            جزئیات
          </button>
        </div>
      </div>
    </>
  );
};

export default SliderItemHome;
