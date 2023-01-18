import React, { useState } from "react";

//

import SliderItemHome from "../subcomponents/SliderItemHome";
import { Movies, } from "../typeing";
//interface
interface Props {
  banner: Movies;
}
//component
const SliderHome = ({ banner }: Props) => {
 
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
    {banner && <SliderItemHome item={banner} />}
   </div>
  );
};

export default React.memo(SliderHome);
