import * as React from "react";
import { FileInfoType } from "../api/directory";
import { GlobalStateProvider } from "../app-state/global-state";
import { initialState } from "../app-state/initial-state";
import { reducer } from "../app-state/reducer";
import { DirectoryNode } from "./directory-node";

export const App = () => (
  <GlobalStateProvider initialState={initialState} reducer={reducer}>
    <DirectoryNode
      path={"/"}
      atime={0}
      mtime={0}
      link={false}
      size={0}
      type={FileInfoType.DIRECTORY}
      dirname={""}
      basename={"ROOT"}
    />
  </GlobalStateProvider>
);
