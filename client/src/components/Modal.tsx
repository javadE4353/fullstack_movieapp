import { useCallback, useEffect, useState, CSSProperties } from "react";

//module external
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { HiOutlineCheck } from "react-icons/hi";
import { BsPlus } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import MuiModal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

//
import {
  Element,
  Genre,
  Movies,
  Userinfo,
  CommentType,
  Ratings,
  StateTypeAuth,
} from "../typeing";

import { modalMylist, modalState, movieState } from "../atoms/modalAtom";
import {
  insertmylist,
  getAllmylist,
  removeMovieMylist,
} from "../redux/actionCreator/actionCreateMylist";
import apiConfig from "../axios/configApi";
import { BsX } from "react-icons/bs";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import Comments from "../subcomponents/Comments";
import { getComments } from "../redux/actionCreator/actionCreateComment";
import {
  getRatings,
  insertRatings,
} from "../redux/actionCreator/actionCreateRatings";
import getmovies, { updatemovie } from "../redux/actionCreator/actionMovie";
import axios from "axios";

//interface
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  right: "44%",
};
const toastStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
};
interface Mylist {
  mylist: { mylist: Movies[]; isloading: boolean };
}

interface RatingsState {
  ratings: {
    ratings: Ratings[];
    isloading: boolean;
    status: number;
  };
}
interface MoviesType {
  movies: {
    movie: Movies[];
    Allmovie: Movies[];
    insert: number;
    update: number;
    delete: number;
    isloading: boolean;
    ErrorMessage: string | null;
  };
}
//component
function Modal() {
  let [color, setColor] = useState("#ffffff");
  const [modal, setModal] = useState<boolean>(false);

  const [showmylist, setShowMylist] = useRecoilState(modalMylist);
  const [trailer, setTrailer] = useState("");
  const [rated, setRated] = useState<boolean>(false);
  const [muted, setMuted] = useState(true);
  //stateMovie
  const [movie, setMovie] = useState<Movies | null>(null);
  //showmovie
  const [play, setPlay] = useState<boolean>(false);
  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [errorMoviePlay, setErrorMoviePlay] = useState<string>("");
  const [ratings, setRatings] = useState<number>(0);
  const [showCament, setShowCament] = useState<boolean>(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<null | Movies>(null);
  //
  // state redux
  const stateRatings = useSelector((state: RatingsState) => state?.ratings);
  const mylist = useSelector((state: Mylist) => state?.mylist);
  const user = useSelector((state: StateTypeAuth) => state?.auth);
  const allMovies = useSelector((state: MoviesType) => state?.movies?.Allmovie);
  //
  const dispatch: Dispatch<any> = useDispatch();
  const {id}=useParams()
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  //
  async function fetchMovie() {
    try {
      const data = await axios.get(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.movieid}?api_key=${
          apiConfig.apiKey
        }&language=en-US&append_to_response=videos`
      );
      console.log(data);
      if (data.data?.videos) {
        // console.log(data?.videos?.results);
        const index = data?.data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data?.data.videos?.results[index]?.key);
      }
      if (data.data?.genres) {
        setGenres(data.data?.genres);
      }
      setLoadingMovie(false);
    } catch (error) {
      setErrorMoviePlay("Network Error");
      setLoadingMovie(false);
    }
  }
  useEffect(() => {
    setErrorMoviePlay("");
    setLoadingMovie(true);
    if (movie && play) {
      fetchMovie();
    }
  }, [play]);

  const handleClose = () => {
    setMovie(null);
    setShowMylist(!showmylist);
    toast.dismiss();
    setModal(false);
    window.history.back()
  };

  //   // Find all the movies in the user's list
  const mylistdata = useCallback(() => {
    if (user?.accessToken && user?.userInfo?.id) {
      const dublicate = mylist?.mylist?.find(
        (item: Movies) =>
          item.id === movie?.id 
      );
      if (dublicate !== undefined) {
        setMovies(dublicate);
        setAddedToList(true);
      } else {
        setAddedToList(false);
        setMovies(null);
      }
    }
  }, [id]);

  const getRatingsAll = useCallback(() => {
    if (movie?.title) {
      dispatch(getRatings(movie?.title, axiosPrivate));
    }
  }, [movie, rated]);

  const handlechakRatings = useCallback(() => {
    console.log(stateRatings?.ratings)
    if (user?.userInfo?.id && stateRatings?.ratings?.length>=0) {
      console.log(stateRatings?.ratings)
      const dublicate = stateRatings.ratings.find((item: Ratings) => {
        if (
          item.userId === user?.userInfo?.id &&
          item.movietitle === movie?.title
        ) {
          return item;
        }
      });
      if (dublicate !== undefined && dublicate?.ratings !== null && movie) {
        setRatings(movie?.vote_count);
        setRated(true);
      } else {
        setRated(false);
      }
    }
  }, [movie, rated, stateRatings.status]);

  //   // Check if the movie is already in the user's list

  const handleList = () => {
    if (
      movies !== null &&
      user?.userInfo?.id !== undefined &&
      addedToList === true
    ) {
      if (movies && user?.userInfo) {
        dispatch(
          removeMovieMylist(axiosPrivate, user.userInfo.id, movies?.id, {})
        );
      }
      setAddedToList(false);
      toast(`${movie?.title || movie?.original_title} از لیست شما حذف شد`, {
        duration: 8000,
        style: toastStyle,
      });
      setAddedToList(false);
    } else if (movie && addedToList === false) {
      const movieAdd = { ...movie, username: user?.userInfo?.username };
      setAddedToList(true);
      dispatch(insertmylist(movieAdd, axiosPrivate));
      toast(`${movie?.title || movie?.original_title} به لیست شما اضافه شد`, {
        duration: 8000,
        style: toastStyle,
      });
    }
  };

  const handleRatings = () => {
    if (movie) {
      const movieItem = {
        adult: movie?.adult,
        backdrop_path: movie?.backdrop_path,
        genre_ids: movie?.genre_ids,
        id: movie?.id,
        original_language: movie?.original_language,
        original_title: movie?.original_title,
        overview: movie?.overview,
        popularity: movie?.popularity,
        poster_path: movie?.poster_path,
        release_date: movie?.release_date,
        title: movie?.title,
        video: movie?.video,
        vote_average: movie?.vote_average,
        vote_count: movie?.vote_count,
        media_type: movie?.media_type,
        movieid: movie?.movieid,
        username: movie?.username,
        userid: movie?.userid,
        roleuser: movie?.roleuser,
        createdAt: movie?.createdAt,
      };
      if (movie?.original_title && rated === false && user?.userInfo?.id) {
        const Ratings: Ratings = {
          username: user?.userInfo?.username,
          movietitle: movie?.original_title,
          ratings: movie?.vote_count + 1,
          userId: user?.userInfo?.id,
        };
        setMovie({ ...movieItem, vote_count: Ratings?.ratings });
        dispatch(
          insertRatings(
            Ratings,
            { ...movieItem, vote_count: Ratings?.ratings },
            movie?.title,
            movie?.id,
            user?.userInfo?.id,
            axiosPrivate
          )
        );
        setRatings(Ratings?.ratings);
        setRated(!rated);
      } else if (
        movie?.original_title &&
        rated === true &&
        user?.userInfo?.id
      ) {
        const Ratings: Ratings = {
          username: user?.userInfo?.username,
          movietitle: movie?.original_title,
          ratings: movie?.vote_count - 1,
          userId: user?.userInfo?.id,
        };
        setMovie({ ...movieItem, vote_count: Ratings?.ratings });
        dispatch(
          insertRatings(
            Ratings,
            { ...movieItem, vote_count: Ratings?.ratings },
            movie?.title,
            movie?.id,
            user?.userInfo?.id,
            axiosPrivate
          )
        );
        setRatings(Ratings?.ratings);
        setRated(!rated);
      }
    }
  };

  useEffect(() => {
    getRatingsAll();
    mylistdata();
    handlechakRatings();
  }, [movie]);
//
  useEffect(() => {
    setModal(true);
  }, []);
  //
  useEffect(() => {
    handlechakRatings();
  }, [stateRatings?.status]);
  //
  useEffect(() => {
   if(id){
    const m=allMovies?.filter(item=>item.id === Number(id))
    if(m.length>0)setMovie(m[0])
   }
  }, [id]);
  return (
    <>
      <MuiModal
        open={stateRatings?.isloading}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <ClipLoader
          color={color}
          loading={stateRatings?.isloading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </MuiModal>

      <MuiModal
        open={modal}
        onClose={handleClose}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <>
          <Toaster position="bottom-center" />
          <button
            className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
            onClick={handleClose}
          >
            <BsX className="h-6 w-6" />
          </button>

          <div className="relative pt-[56.25%]">
            <>
              {play ? (
                <>
                  {errorMoviePlay ? (
                    <div className="absolute inset-y-0 h-full w-full text-center text-black bg-white flex items-center justify-center">{errorMoviePlay}</div>
                  ) : (
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${trailer}`}
                      width="100%"
                      height="100%"
                      style={{ position: "absolute", top: "0", left: "0" }}
                      playing
                      loop
                      controls
                      volume={1}
                      light={true}
                      muted={muted}
                    />
                  )}
                </>
              ) : (
                <div
                  className="w-full bg-cover bg-no-repeat bg-center absolute inset-y-0 h-full"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.poster_path})`,
                  }}
                >
                   <div
                     className="w-[40%] absolute  h-full rounded py-4 px-4"
                   >
                   <div
                    className="w-full bg-contain bg-no-repeat bg-center h-full rounded py-4 px-4"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.poster_path})`,
                    }}
                  ></div>
                   </div>
                </div>
              )}
            </>
            <div className="absolute bottom-10 flex w-full items-center justify-between px-10"></div>
          </div>
          <div className="flex flex-col space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="p-2">
                <h3>{movie?.title || movie?.original_title}</h3>
              </div>
              <div>
                <div className="flex justify-around space-x-2 p-4 border border-white border-solid rounded-md justify-center w-auto lg:w-[30%] md:w-[50%]">
                  <button
                    onClick={() => setPlay(!play)}
                    className="flex border border-blue-400 items-center gap-x-2 rounded pl-8 text-xl font-bold text-white transition hover:bg-[#e6e6e6]"
                  >
                    <FaPlay className="h-7 w-7 text-black" />
                    {play ? "خروج" : "نمایش"}
                  </button>
                  <button
                    className="mr-4 modalButton"
                    onClick={() => handleList()}
                  >
                    {addedToList ? (
                      <HiOutlineCheck className="h-7 w-7" />
                    ) : (
                      <BsPlus className="h-7 w-7" />
                    )}
                  </button>
                  <button
                    className="modalButton"
                    onClick={() => handleRatings()}
                  >
                    <BsHandThumbsUpFill
                      className={`h-6 w-6 ${rated ? "text-blue-400" : null}`}
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                {/* <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p> */}
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                  تاریخ:<p className="font-light">{movie?.release_date}</p>
                </div>
              </div>
              <div className="p-4 rounded-md border border-white border-solid	">
                <p className="w-full">{movie?.overview}</p>
              </div>
              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">ژانر:</span>{" "}
                    {genres.map((genre) => genre.name).join(", ")}
                  </div>

                  <div>
                    <span className="text-[gray]">زبان:</span>{" "}
                    {movie?.original_language}
                  </div>

                  <div>
                    <span className="text-[gray]">امتیاز:</span>{" "}
                    {ratings > 0 ? ratings : movie?.vote_count}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => setShowCament(!showCament)}>
                   برای مشاهده نظرات کلیک کنید
              </button>

              {movie && user?.userInfo && showCament ? (
                <Comments
                  movie={movie}
                  ratings={movie?.vote_count}
                  newratings={ratings}
                />
              ) : null}
            </div>
          </div>
        </>
      </MuiModal>
      <MuiModal
        open={mylist?.isloading}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <ClipLoader
          color={color}
          loading={mylist?.isloading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </MuiModal>
    </>
  );
}

export default Modal;
