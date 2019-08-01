import { readdir } from "./directory";
import { FileInfo, readfile } from "./file";

export interface API {
  readdir(path: string): Promise<FileInfo[]>;
  readfile(path: string): Promise<string>;
}

export class BasicAPI implements API {
  public readonly readdir = readdir;
  public readonly readfile = readfile;
}
