import { FileInfo, readdir } from "./directory";

export interface API {
  readdir(path: string): Promise<FileInfo[]>;
}

export class BasicAPI implements API {
  public readonly readdir = readdir;
}
