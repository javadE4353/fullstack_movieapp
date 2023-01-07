import {
  INSERTMYLIST,
  REQUESTFAILDMYLIST,
  REQUESTSECCESSMYLIST,
  REQUESTMYLIST,
} from "../types/types";
import { Movies } from "../../typeing";

interface requestmylist {
  type: "REQUESTMYLIST";
}
interface successmylist {
  type: "REQUESTSECCESSMYLIST"
  payload: {mylist:Movies[],insert:number,delete:number,count:number}
}
interface insertmyist {
  type: "INSERTMYLIST"
  payload: {insert:number}

}
interface faildmylist {
  type: "REQUESTFAILDMYLIST";
}
interface removemylist {
  type: "REMOVEMYLIST"
  payload: {delete:number}

}

export type Action =
  | requestmylist
  | successmylist
  | faildmylist
  | insertmyist
  | removemylist;
