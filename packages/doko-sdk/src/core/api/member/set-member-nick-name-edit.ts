import type { ApiResponse, DodoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 编辑成员群昵称
 * @see https://open.imdodo.com/dev/api/member.html#%E7%BC%96%E8%BE%91%E6%88%90%E5%91%98%E7%BE%A4%E6%98%B5%E7%A7%B0
 */
export namespace setMemberNickNameEdit {
  export interface Request {
    islandId: string;
    dodoId: string;
    nickName: string;
  }
  export interface Response extends DodoResponse<void> {}
}

export function setMemberNickNameEdit(
  this: Axios,
  params: setMemberNickNameEdit.Request
): ApiResponse<setMemberNickNameEdit.Response> {
  return this.post("/api/v1/member/nickname/edit", params);
}
