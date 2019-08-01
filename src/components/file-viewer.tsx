import * as React from "react";
import { useGlobalState } from "../app-state/global-state";

export const FileViewer: React.FC = () =>
  useGlobalState(([state, dispatch]) => {
    return state.openedFilePath ? (
      <div style={{ border: "1px solid black" }}>
        <div>{state.openedFilePath}</div>
        <div>
          {state.loadingPaths[state.openedFilePath]
            ? "Loading..."
            : state.fileContents[state.openedFilePath]}
        </div>
      </div>
    ) : (
      <></>
    );
  });
FileViewer.displayName = "FileViewer";
