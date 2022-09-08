import { defineInterceptor } from "./define.js";

export default defineInterceptor((doko) => {
  const tokenStore = doko.store.useToken();

  return {
    request: {
      onFulfilled(value) {
        if (value.headers && tokenStore.clientId && tokenStore.token) {
          value.headers["Authorization"] = tokenStore.header;
        }
        return value;
      },
    },
  };
});
