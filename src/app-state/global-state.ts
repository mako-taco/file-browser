import { FileInfo } from "../api/directory";
import { createGSM } from "../gsm/create-gsm";

export interface AppState {
  infos: FileInfo[];
  loadingPaths: { [path: string]: boolean };
  expandedPaths: { [path: string]: boolean };
}

export type AppActions =
  | { type: "expand"; path: string }
  | { type: "readdir"; path: string }
  | { type: "readdir-complete"; path: string; info: FileInfo[] };

export const { useGlobalState, GlobalStateProvider } = createGSM<
  AppState,
  AppActions
>();
