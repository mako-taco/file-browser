import { useContext } from "react";
import * as React from "react";
import { BasicAPI } from "./api";

const APIContext = React.createContext(new BasicAPI());

export function useAPI() {
  const value = useContext(APIContext);
  return value;
}
