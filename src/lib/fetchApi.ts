interface FetchApiOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

export async function fetchApi<T>(
  url: string,
  options: FetchApiOptions = {}
): Promise<T> {
  const { method = "GET", body, headers, timeout, signal } = options;

  const controller = new AbortController();
  const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null;

  try {
    const response = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body !== undefined && {
        body: (body instanceof URLSearchParams || typeof body === "string") 
          ? body 
          : JSON.stringify(body)
      }),
      signal: signal || controller.signal,
    });

    if (timeoutId) clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const message = errorBody?.errorMessage || errorBody?.message || response.statusText;
      const error = new Error(message) as any;
      error.status = response.status;
      error.data = errorBody;
      throw error;
    }

    return response.json() as Promise<T>;
  } catch (err: any) {
    if (timeoutId) clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error("REQUEST_TIMEOUT");
    }
    throw err;
  }
}

