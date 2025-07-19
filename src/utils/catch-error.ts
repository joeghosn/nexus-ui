export type BackendError = {
  data: {
    status: "error";
    statusCode: number;
    message: string;
  };
};

export const isBackendError = (response: unknown): response is BackendError => {
  if (response !== null && typeof response === "object" && "data" in response) {
    const resp = response as Record<string, unknown>;
    const data = resp.data;
    if (
      data !== null &&
      typeof data === "object" &&
      "status" in data &&
      (data as Record<string, unknown>).status === "error" &&
      "statusCode" in data &&
      typeof (data as Record<string, unknown>).statusCode === "number" &&
      "message" in data &&
      typeof (data as Record<string, unknown>).message === "string"
    ) {
      return true;
    }
  }
  return false;
};
