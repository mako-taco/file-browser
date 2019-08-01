import { AppState } from "./global-state";

export const initialState: AppState = {
  expandedPaths: { "/": false },
  infos: [],
  loadingPaths: { "/": true },
  fileContents: {},
  openedFilePath: null
};
