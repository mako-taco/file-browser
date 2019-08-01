import { apiFetchText } from "./fetch";

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

export async function readfile(path: string): Promise<string> {
  return apiFetchText(`/pfs/file${path}`);
}
