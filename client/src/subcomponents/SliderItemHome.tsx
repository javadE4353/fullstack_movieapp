import React, { useState } from "react";

//module external
import { useRecoilState } from "recoil";
import { FaPlay } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {LazyLoadImage} from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';
//
import { showAlert } from "../atoms/modalAtom";
import { Movies, StateTypeAuth } from "../typeing";
import { useAppSelector, useAppDispatch } from "../app/hooks";

//interface
interface Props {
  item: Movies;
}

const SliderItemHome = ({ item }: Props) => {
  const user = useAppSelector((state: StateTypeAuth) => state?.auth);
  const navigate = useNavigate();

  const [showalret, setShowAlert] = useRecoilState(showAlert);
  const handleShowMovie = (id: number | null) => {
    if (user?.userInfo?.username && id) {
      navigate(`/movie/${id}`);
    } else {
      toast("برای مشاهده فیلم در سایت ثبت نام کنید", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };
  return (
    <>
       <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[100vh] lg:justify-end lg:pb-12">
        <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
          {item && (
            <LazyLoadImage
            src={`${item?.poster_path}`}
            className="object-cover w-full"
            placeholderSrc={`${item?.title}`}
            effect="blur"
            />
          )}
        </div>
        <div className="translate-y-2/4 translate-x-[-2px]">
          <h1 className="text-white text- text-2xl font-bold md:text-4xl lg:text-7xl xs:text-sm pr-3">
            {item?.title || item?.original_title}
          </h1>
          <p className=" text-white max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl pr-3">
            {item?.overview.slice(0, 100)}
          </p>

          <div className="flex space-x-3 pr-3 my-4">
            <button
              className="ml-2 bannerButton bg-transparent text-white border border-red-500 rounded-md"
              onClick={() => handleShowMovie(item?.id ? item?.id : null)}
            >
              <FaPlay className="h-4 w-4 text-red md:h-7 md:w-7" />
              نمایش
            </button>

            <button
              className="mr-4 bannerButton bg-[#e1e1e1] border border-[#e1e1e1] rounded-md "
              onClick={() => handleShowMovie(item?.id ? item?.id : null)}
            >
              <HiOutlineInformationCircle className="h-5 w-5 md:h-8 md:w-8" />
              جزئیات
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(SliderItemHome);
