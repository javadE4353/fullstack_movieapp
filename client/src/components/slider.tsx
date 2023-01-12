import React from "react";

//
import SliderItemHome from "../subcomponents/SliderItemHome";
import { Movies } from "../typeing";

//interface
interface Props {
  banner: Movies 
}

//component
const SliderHome = ({banner}:Props) => {
  return (
    <>
    {banner && <SliderItemHome item={banner} />}
    </>
  );
};

export default React.memo(SliderHome);
