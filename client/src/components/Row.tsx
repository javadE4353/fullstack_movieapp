import { useEffect, useRef, useState } from "react";

//module external
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Movies } from "../typeing";
import Thumbnail from "./thumbnail";
import { Link } from "react-router-dom";
import { moviefake } from "../data/data";

//interface
interface Props {
  title: string;
  category: number;
  movies: Movies[] | null;
}

//component
function Row({ title, movies, category }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <Link
        to="/"
        className=" cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl pr-3 p-2 text-center border border-white rounded-md inline-block w-[30%] sm:w-[15%]"
      >
        {title}
      </Link>
      <div className="group relative md:-ml-2">
        <BsChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 `}
          onClick={() => handleClick("left")}
        />
        <div
          className="flex items-center space-x-0.5 overflow-x-scroll overflow-y-hidden scrollbar-hide md:space-x-2.5 md:p-2"
          ref={rowRef}
        >
          {movies ? (
            <>
              {movies?.map((movie, i) => (
                <>
                  {category === 1 && movie?.movieid ? (
                    <>
                      <Thumbnail key={movie.id} movie={movie} category={category} />
                    </>
                  ) : (
                    <>
                      {movie?.genre_ids.includes(category) && (
                        <Thumbnail key={movie.id} movie={movie} category={category} />
                      )}
                    </>
                  )}
                </>
              ))}
            </>
          ) : (
            <>
              {moviefake?.map((movie, i) => (
                <Thumbnail key={i} movie={movie} category={category}/>
              ))}
            </>
          )}
        </div>
        <BsChevronRight
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 
          ${!isMoved && "hidden"}`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
