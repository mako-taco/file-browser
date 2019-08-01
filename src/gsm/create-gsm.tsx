import * as React from "react";
import { GSContext, GSProviderProps } from "./types";

export function createGSM<S, A>() {
  const GlobalStateContext = React.createContext<GSContext<S, A> | null>(null);

  const GlobalStateProvider: React.FC<GSProviderProps<S, A>> = ({
    reducer,
    initialState,
    children
  }: GSProviderProps<S, A>) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
      <GlobalStateContext.Provider value={[state, dispatch]}>
        {children}
      </GlobalStateContext.Provider>
    );
  };

  const useGlobalState = (
    fn: (ctx: GSContext<S, A>) => React.ReactElement
  ): React.ReactElement => {
    const stateVal = React.useContext(GlobalStateContext);
    return stateVal === null ? <></> : fn(stateVal);
  };

  return { useGlobalState, GlobalStateProvider };
}
