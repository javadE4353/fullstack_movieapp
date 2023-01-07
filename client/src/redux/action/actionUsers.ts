import {
  REQUESTUSER,
  GETUSERS,
  INCERTUSER,
  UPDATEUSER,
  DELETEUSER,
  FAILREQUESTUSER,
} from "../types/types";
import { Users } from "../../typeing";

interface requestUsers {
  type: "REQUESTUSER";
}
interface getAllUsers {
  type: "GETUSERS";
  payload: { users: Users[]; count: number };
}
interface getAllUser {
  type: "GETUSER";
  payload: { user: Users[] };
}
interface insertusers {
  type: "INCERTUSER";
  payload: { insert: number };
}
interface updateUser {
  type: "UPDATEUSER";
  payload: { update: number };
}
interface deleteUsers {
  type: "DELETEUSER";
  payload:{delete:number}
}
interface failUsers {
  type: "FAILREQUESTUSER";
  payload: { ErrorMassege: string | null };
}

export type Action =
  | requestUsers
  | getAllUsers
  | getAllUser
  | insertusers
  | updateUser
  | deleteUsers
  | failUsers;
