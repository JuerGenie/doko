import type { ApiResponse, DodoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 赋予成员身份组
 * @see https://open.imdodo.com/dev/api/role.html#%E8%B5%8B%E4%BA%88%E6%88%90%E5%91%98%E8%BA%AB%E4%BB%BD%E7%BB%84
 */
export namespace setRoleMemberAdd {
  export interface Request {
    islandId: string;
    dodoId: string;
    roleId: string;
  }
  export interface Response extends DodoResponse<void> {}
}

export function setRoleMemberAdd(
  this: Axios,
  params: setRoleMemberAdd.Request
): ApiResponse<setRoleMemberAdd.Response> {
  return this.post("/api/v1/role/member/add", params);
}
