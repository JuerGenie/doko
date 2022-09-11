import { getLogger } from "../../../utils/logger.js";
import { DodoResponse, StatusCode } from "../index.js";
import { defineInterceptor } from "./define.js";

const logger = getLogger("ErrorHandler");
export default defineInterceptor(() => ({
  response: {
    onFulfilled(resp) {
      if (typeof resp === "object") {
        const data = resp.data as DodoResponse;
        if (data.status !== StatusCode.Success) {
          throw new Error(
            `DodoRequestError: ${StatusCode[data.status]} -> ${data.message}`
          );
        }
      }
      return resp;
    },
    onRejected(error) {
      logger.error(error);
      return error;
    },
  },
}));
