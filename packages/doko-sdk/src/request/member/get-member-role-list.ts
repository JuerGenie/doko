import type { RoleModel } from "doko-sdk/model/data/role.js";
import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 获取成员身份组列表
 * @see https://open.imdodo.com/dev/api/member.html#%E8%8E%B7%E5%8F%96%E6%88%90%E5%91%98%E8%BA%AB%E4%BB%BD%E7%BB%84%E5%88%97%E8%A1%A8
 */
export namespace getMemberRoleList {
  export interface Request {
    islandId: string;
    dodoId: string;
  }
  export interface Response extends DokoResponse<RoleModel[]> {}
}

export function getMemberRoleList(
  api: Axios,
  params: getMemberRoleList.Request
): ApiResponse<getMemberRoleList.Response> {
  return api.post("/api/v1/member/role/list", params);
}
