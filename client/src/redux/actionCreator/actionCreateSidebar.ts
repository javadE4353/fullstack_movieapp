import { CLOSESIDEBAR, OPENSIDEBAR } from "../types/types";

interface typedispatch {
  type: string;
}

type DispatchType = (args: typedispatch) => typedispatch;

export const actionclosesidebar = () => {
  return (dispatch: DispatchType) => {
    dispatch({ type: CLOSESIDEBAR });
  };
};
export const actionopensidebar = () => {
  return (dispatch: DispatchType) => {
    dispatch({ type: OPENSIDEBAR });
  };
};
