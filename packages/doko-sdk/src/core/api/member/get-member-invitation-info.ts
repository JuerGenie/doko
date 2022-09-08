import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 获取成员邀请信息
 * @see https://open.imdodo.com/dev/api/member.html#%E8%8E%B7%E5%8F%96%E6%88%90%E5%91%98%E9%82%80%E8%AF%B7%E4%BF%A1%E6%81%AF
 */
export namespace getMemberInvitationInfo {
  export interface Request {
    islandId: string;
    dodoId: string;
  }
  export interface Response
    extends DokoResponse<{
      dodoId: string;
      nickName: string;
      invitationCount: number;
    }> {}
}

export function getMemberInvitationInfo(
  this: Axios,
  params: getMemberInvitationInfo.Request
): ApiResponse<getMemberInvitationInfo.Response> {
  return this.post("/api/v1/member/invitation/info", params);
}
