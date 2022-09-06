import type { RoleModel } from "doko-sdk/model/data/role.js";
import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 获取身份组列表
 * @see https://open.imdodo.com/dev/api/role.html#%E8%8E%B7%E5%8F%96%E8%BA%AB%E4%BB%BD%E7%BB%84%E5%88%97%E8%A1%A8
 */
export namespace getRoleList {
  export interface Request {
    islandId: string;
  }
  export interface Response extends DokoResponse<RoleModel[]> {}
}

export function getRoleList(
  api: Axios,
  params: getRoleList.Request
): ApiResponse<getRoleList.Response> {
  return api.post("/api/v1/role/list", params);
}
