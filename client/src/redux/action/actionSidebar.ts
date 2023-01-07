import { CLOSESIDEBAR, OPENSIDEBAR } from "../types/types";

interface closesidebar {
  type: "CLOSESIDEBAR";
}

interface opensidebar {
  type: "OPENSIDEBAR";
}

export type Action = closesidebar | opensidebar;
