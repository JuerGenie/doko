import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 取消成员身份组
 * @see https://open.imdodo.com/dev/api/role.html#%E5%8F%96%E6%B6%88%E6%88%90%E5%91%98%E8%BA%AB%E4%BB%BD%E7%BB%84
 */
export namespace setRoleMemberRemove {
  export interface Request {
    islandId: string;
    dodoId: string;
    roleId: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setRoleMemberRemove(
  this: Axios,
  params: setRoleMemberRemove.Request
): ApiResponse<setRoleMemberRemove.Response> {
  return this.post("/api1/v1/role/member/remove", params);
}
