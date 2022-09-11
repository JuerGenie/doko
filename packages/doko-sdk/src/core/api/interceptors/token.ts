import { getLogger } from "../../../utils/logger.js";
import { defineInterceptor } from "./define.js";

const logger = getLogger("Token");

export default defineInterceptor((doko) => {
  return {
    request: {
      onFulfilled(value) {
        logger.debug(value.headers, doko.get("clientId"), doko.get("token"));
        if (value.headers && doko.get("clientId") && doko.get("token")) {
          value.headers["Authorization"] = `Bot ${[
            doko.get("clientId"),
            doko.get("token"),
          ].join(".")}`;
        }
        return value;
      },
    },
  };
});
