interface FetchApiOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
}

export async function fetchApi<T>(
  url: string,
  options: FetchApiOptions = {}
): Promise<T> {
  const { method = "GET", body } = options;

  const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...(body !== undefined && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.errorMessage || errorBody?.message || response.statusText;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
