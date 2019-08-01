import * as React from "react";

/**
 * GSM = Global State Management
 * Reduxy app state management w/ react hooks
 */
export interface GSProviderProps<S, A> {
  reducer: React.Reducer<S, A>;
  initialState: S;
  children?: React.ReactNode;
}
export type GSContext<S, A> = [S, React.Dispatch<A>];

export type Reducer<S, A> = (state: Readonly<S>, action: A) => S;
