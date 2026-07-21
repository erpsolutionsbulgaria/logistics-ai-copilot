const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not configured");
}

type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

// type ApiRequestOptions = RequestInit;

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor({
    message,
    status,
    data,
  }: {
    message: string,
    status: number,
    data: unknown, 
  }) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiClient<T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<T> {
    const { body, headers, ...requestOptions } = options;
  
    const response = await fetch(`${API_URL}${path}`, {
    ...requestOptions,

    headers: {
        Accept: "application/json",

        ...(body !== undefined
        ? {
            "Content-Type": "application/json",
          }
        : {}),
        
        ...headers
        },
    });

    const contentType = response.headers.get("content-type");
  
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();
  
    if (!response.ok) {
    const message =
      typeof responseData === "object" &&
      responseData !== null &&
      "message" in responseData
        ? getApiErrorMessage(responseData.message)
        : `Request failed with status ${response.status}`;
  
      throw new ApiError({
          message,
          status: response.status,
          data: responseData,
      })
    }

    return responseData as T;
}

function getApiErrorMessage(message: unknown): string {
    if (typeof message === "string") {
        return message;
    }

    if (Array.isArray(message)) {
        return message
        .filter((item): item is string => typeof item === "string")
        .join(", ");
    }

    return "An unexpected API error occurred";
}
