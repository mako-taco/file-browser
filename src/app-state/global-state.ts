import { FileInfo } from "../api/file";
import { createGSM } from "../gsm/create-gsm";

export interface AppState {
  infos: FileInfo[];
  loadingPaths: { [path: string]: boolean };
  expandedPaths: { [path: string]: boolean };
  fileContents: { [path: string]: string };
  openedFilePath: string | null;
}

export type AppActions =
  | { type: "readfile"; path: string }
  | { type: "readfile-complete"; path: string; content: string }
  | { type: "expand"; path: string }
  | { type: "readdir"; path: string }
  | { type: "readdir-complete"; path: string; info: FileInfo[] };

export const { useGlobalState, GlobalStateProvider } = createGSM<
  AppState,
  AppActions
>();
