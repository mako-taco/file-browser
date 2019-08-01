import { apiFetchSuccess } from "./fetch";
import { FileInfo } from "./file";

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
