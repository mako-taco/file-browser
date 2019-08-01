const url = `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${
  process.env.API_PORT
}`;

enum APIStatus {
  SUCCESS = "success",
  ERROR = "error"
}

export interface APISuccess<T> {
  status: typeof APIStatus.SUCCESS;
  data: T;
}

export interface APIError {
  status: typeof APIStatus.ERROR;
  data: null;
}

export type APIResponse<T> = APISuccess<T> | APIError;

export async function apiFetch<T>(
  path: string,
  noParse = false
): Promise<APIResponse<T>> {
  const response = await fetch(`${url}${path}`);
  const json = await response.json();
  if (
    typeof json !== "object" ||
    (json.status !== APIStatus.ERROR && json.status !== APIStatus.SUCCESS)
  ) {
    throw new Error(`Unexpected server response: ${json}`);
  }

  return json;
}

export async function apiFetchText(path: string): Promise<string> {
  const response = await fetch(`${url}${path}`);
  return response.text();
}

/** Throws if APIError, calls fn if APISuccess */
export async function apiFetchSuccess<T>(path: string): Promise<T> {
  const response = await apiFetch<T>(path);
  if (response.status === APIStatus.SUCCESS) {
    return response.data;
  } else {
    throw new Error(`APIError on ${path}: ${response}`);
  }
}
