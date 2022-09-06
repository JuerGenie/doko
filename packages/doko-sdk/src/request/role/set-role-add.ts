import type { RoleModel } from "../../model/role.js";
import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 创建身份组
 * @see https://open.imdodo.com/dev/api/role.html#%E5%88%9B%E5%BB%BA%E8%BA%AB%E4%BB%BD%E7%BB%84
 */
export namespace setRoleAdd {
  export interface Request {
    islandId: string;
    roleName?: string;
    roleColor?: string;
    position?: number;
    permission?: string;
  }
  export interface Response extends DokoResponse<Pick<RoleModel, "roleId">> {}
}

export function setRoleAdd(
  api: Axios,
  params: setRoleAdd.Request
): ApiResponse<setRoleAdd.Response> {
  return api.post("/api/v1/role/add", params);
}
