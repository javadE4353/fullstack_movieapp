//module external
import { useRecoilState } from "recoil";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsX } from "react-icons/bs";

//
import { showAlert } from "../atoms/modalAtom";
import Card from "../subcomponents/Card";
//type
import { Movies, StateTypeAuth } from "../typeing";

//interface
interface Props {
  movie: Movies[] | null;
  gener: number;
}

function Category({ movie, gener }: Props) {
  const [showalret, setShowAlert] = useRecoilState(showAlert);

  //accessToken
  const accesstoken = useSelector((state: StateTypeAuth) => state?.auth);

  return (
    <>
      <div
        className={`fixed top-0 z-[999] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${
          showalret ? "block" : "hidden"
        }`}
      >
        <strong className="font-bold">اشتراک!</strong>
        <span className="block sm:inline">
          برای تماشای فیلم ها باید اشتراک داشته باشید یا در سایت ثبت نام کنید
        </span>
        <span
          className="absolute top-0 bottom-0 left-0 px-4 py-3"
          onClick={() => setShowAlert(false)}
        >
          <BsX size={20} />
        </span>
      </div>

      <div className="flex flex-wrap justify-center	items-center">
        <>
          {movie ? (
            <>
              {movie?.map((item: Movies) => (
                <div className="flex flex-wrap">
                  {gener === 0 ? (
                    <>
                      <Card key={item.id} movie={item} />
                    </>
                  ) : (
                    <>
                      movie?.genre_ids.includes(gener) &&{" "}
                      <Card key={item.id} movie={item} />
                    </>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="w-[21rem] max-w-[100%] bg-black rounded-xl p-3 text-white m-5 flex flex-col  cursor-pointer text-xl hover:scale-110 h-36 justify-center item-center">
              <div className="h-[100%]">
                <h4>فیلم وجود ندارد</h4>
              </div>
            </div>
          )}
        </>
      </div>
      {accesstoken?.accessToken && <Outlet />}
    </>
  );
}

export default Category;
