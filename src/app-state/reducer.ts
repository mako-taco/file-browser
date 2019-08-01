import { Reducer } from "../gsm/types";
import { AppActions, AppState } from "./global-state";

export const reducer: Reducer<AppState, AppActions> = debugReducer(
  (state: AppState, action: AppActions): AppState => {
    switch (action.type) {
      case "expand":
        return {
          ...state,
          expandedPaths: {
            ...state.expandedPaths,
            [action.path]: !state.expandedPaths[action.path]
          }
        };
      case "readdir":
        return {
          ...state,
          loadingPaths: {
            ...state.loadingPaths,
            [action.path]: true
          }
        };
      case "readdir-complete":
        return {
          ...state,
          infos: [
            ...state.infos.filter(info => info.dirname !== action.path),
            ...action.info
          ],
          loadingPaths: {
            ...state.loadingPaths,
            [action.path]: false
          }
        };
      default:
        return state;
    }
  }
);

function debugReducer<S, A>(originalReducer: Reducer<S, A>): Reducer<S, A> {
  return (state, action) => {
    console.debug("action", action);
    console.debug("before", state);
    const after = originalReducer(state, action);
    console.debug("after", after);
    return after;
  };
}
