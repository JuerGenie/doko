import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**  */
export namespace __templateNameToCamelCase__ {
  export interface Request {}
  export interface Response extends DokoResponse<{}> {}
}

export function __templateNameToCamelCase__(
  api: Axios
): ApiResponse<__templateNameToCamelCase__.Response> {
  return api.post("");
}
