import {
  REQUESTCOMMENT,
  SUCCESSCOMENT,
  FAILDCOMMENT,
  INSERTCOMMENT,
  DELETECOMMENT,
} from "../types/types";

import { CommentType } from "../../typeing";
interface requestComment {
  type: "REQUESTCOMMENT";
}
interface successComment {
  type: "SUCCESSCOMENT";
  payload: { comment: CommentType[], ErrorMassege: string,insert:number,delete:number };
}
interface faildComment {
  type: "FAILDCOMMENT";
  payload: {ErrorMassege: string,insert:number,delete:number };
}
interface insertComment {
  type: "INSERTCOMMENT";
  payload: { insert: number,comment: CommentType[] };
}
interface deleteComment {
  type: "DELETECOMMENT";
  payload: { delete: number,comment: CommentType[] };
}
export type Action =deleteComment | insertComment | faildComment | successComment | requestComment;
