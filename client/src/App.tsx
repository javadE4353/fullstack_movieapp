import { useEffect } from "react";

//module external
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

//
import { getAllmovie } from "./redux/actionCreator/actionMovie";
import newAccessTokenAction from "./redux/actionCreator/actionCreateAccessToken";
import ConfigPages from "./configPages/ConfigPages";
import{ getPublicCategory } from "./redux/actionCreator/actionCreateCategory";

//APP
const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(getAllmovie());
    dispatch(getPublicCategory());
    dispatch(newAccessTokenAction(dispatch));
  }, []);

  return (
    <>
    <ConfigPages />
    </>
  );
};

export default App;
