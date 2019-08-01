import * as React from "react";
import { FileInfo, FileInfoType } from "../api/file";
import { useAPI } from "../api/react-hook";
import { useGlobalState } from "../app-state/global-state";

export const DirectoryNode: React.FC<FileInfo> = info =>
  useGlobalState(([state, dispatch]) => {
    const api = useAPI();
    React.useEffect(() => {
      const readdir = async () => {
        dispatch({ type: "readdir", path: info.path });
        const resp = await api.readdir(info.path);
        dispatch({ type: "readdir-complete", path: info.path, info: resp });
      };
      readdir();
    }, [info.mtime, info.path]);

    const toggleExpanded = React.useMemo(() => {
      return (e: React.MouseEvent) =>
        dispatch({ type: "expand", path: info.path });
    }, [info.path]);

    const isExpanded = Boolean(state.expandedPaths[info.path]);
    return (
      <div>
        <div onClick={toggleExpanded}>{info.basename}</div>
        {isExpanded ? <DirectoryList path={info.path} /> : <></>}
      </div>
    );
  });
DirectoryNode.displayName = "DirectoryNode";

interface DirectoryListProps {
  path: string;
}

export const DirectoryList: React.FC<DirectoryListProps> = ({ path }) =>
  useGlobalState(([state, dispatch]) => {
    return (
      <div style={{ paddingLeft: 20 }}>
        {state.loadingPaths[path] ? (
          <div>Loading...</div>
        ) : (
          <>
            {state.infos
              .filter(info => info.dirname === path)
              .map(info => (
                <>
                  {info.type === FileInfoType.DIRECTORY ? (
                    <DirectoryNode {...info} key={info.path} />
                  ) : (
                    <FileNode {...info} key={info.path} />
                  )}
                </>
              ))}
          </>
        )}
      </div>
    );
  });
DirectoryList.displayName = "DirectoryList";

export const FileNode: React.FC<FileInfo> = info =>
  useGlobalState(([state, dispatch]) => {
    const api = useAPI();
    const clickHandler = React.useMemo(() => {
      return async (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch({ type: "readfile", path: info.path });
        const resp = await api.readfile(info.path);
        dispatch({ type: "readfile-complete", path: info.path, content: resp });
      };
    }, [info.path]);

    return <div onClick={clickHandler}>{info.basename}</div>;
  });
FileNode.displayName = "FileNode";
