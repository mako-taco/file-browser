import { Reducer } from "./types";

export function composeReducers<S, A>(
  ...reducers: Reducer<Partial<S>, A>[]
): Reducer<S, A> {
  return (s, a) => {
    let ss = s;
    for (const reducer of reducers) {
      ss = { ...ss, ...reducer(ss, a) };
    }
    return ss;
  };
}

export function composeState<S>(...state: Partial<S>[]): S {
  return Object.assign({}, ...state);
}
