import { MemberModel } from "../../model/member.js";
import { ApiResponse, DodoResponse } from "../index.js";
import { Axios } from "axios";

/**
 * 获取成员信息
 * @see https://open.imdodo.com/dev/api/member.html#%E8%8E%B7%E5%8F%96%E6%88%90%E5%91%98%E4%BF%A1%E6%81%AF
 */
export namespace getMemberInfo {
  export interface Request {
    islandId: string;
    dodoId: string;
  }
  export interface Response extends DodoResponse<MemberModel> {}
}

export function getMemberInfo(
  this: Axios,
  params: getMemberInfo.Request
): ApiResponse<getMemberInfo.Response> {
  return this.post("/api/v1/member/info", params);
}
