import { apiFetchSuccess } from "./fetch";

export enum FileInfoType {
  DIRECTORY = "directory",
  FILE = "file"
}

export interface ResponseFileInfo {
  atime: number;
  link: boolean;
  mtime: number;
  path: string;
  size: number;
  type: FileInfoType;
}

export type FileInfo = ResponseFileInfo & {
  dirname: string;
  basename: string;
};

interface DirInfo {
  [file: string]: FileInfo;
}

export async function readdir(path: string): Promise<FileInfo[]> {
  const dirInfo: DirInfo = await apiFetchSuccess(`/pfs/dir${path}`);
  /* Should do validation of payload here for sanity */
  return Object.keys(dirInfo).map(basename => {
    const fileInfo = dirInfo[basename];
    return { ...fileInfo, dirname: path, basename };
  });
}
