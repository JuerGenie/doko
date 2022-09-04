import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 编辑身份组
 * @see https://open.imdodo.com/dev/api/role.html#%E7%BC%96%E8%BE%91%E8%BA%AB%E4%BB%BD%E7%BB%84
 */
export namespace setRoleEdit {
  export interface Request {
    islandId: string;
    roleId: string;
    roleName?: string;
    roleColor?: string;
    position?: number;
    permision?: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setRoleEdit(
  api: Axios,
  params: setRoleEdit.Request
): ApiResponse<setRoleEdit.Response> {
  return api.post("/api/v1/role/edit", params);
}
