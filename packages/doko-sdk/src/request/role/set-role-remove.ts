import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 删除身份组
 * @see https://open.imdodo.com/dev/api/role.html#%E5%88%A0%E9%99%A4%E8%BA%AB%E4%BB%BD%E7%BB%84
 */
export namespace setRoleRemove {
  export interface Request {
    islandId: string;
    roleId: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setRoleRemove(
  api: Axios,
  params: setRoleRemove.Request
): ApiResponse<setRoleRemove.Response> {
  return api.post("/api/v1/role/remove", params);
}
