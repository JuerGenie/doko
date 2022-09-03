import { defineInterceptor } from "./define.js";

export default defineInterceptor(() => ({
  request: {
    onFulfilled(value) {
      if (
        !["get", "delete"].includes(value.method?.toLowerCase() ?? "get") &&
        value.data &&
        typeof value.data === "object"
      ) {
        (value.headers ??= {})["content-type"] = "application/json";
        value.data = JSON.stringify(value.data);
      }
      return value;
    },
  },
  response: {
    onFulfilled(value) {
      if (value.headers["content-type"].startsWith("application/json")) {
        if (typeof value.data === "string") {
          value.data = JSON.parse(value.data);
        }
      }
      return value;
    },
  },
}));
