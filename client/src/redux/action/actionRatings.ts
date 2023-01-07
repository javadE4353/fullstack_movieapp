import {REQUESTRATING,SUCCESSRATING,FAILDRATING,INSERTRATING} from "../types/types";
import {Ratings} from '../../typeing'


interface requestRatings{
  type: "REQUESTRATING";
}
interface successRatings{
  type: "SUCCESSRATING";
  payload:{ rating:Ratings[],status:number};
}
interface insertRatings {
  type: "INSERTRATING";
}
interface faildRatings {
  type: "FAILDRATING";
}

export type Action = requestRatings| successRatings| faildRatings | insertRatings;