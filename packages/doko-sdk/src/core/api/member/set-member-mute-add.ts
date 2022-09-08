import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 禁言成员
 * @see https://open.imdodo.com/dev/api/member.html#%E7%A6%81%E8%A8%80%E6%88%90%E5%91%98
 */
export namespace setMemberMuteAdd {
  export interface Request {
    islandId: string;
    dodoId: string;
    duration: number;
    reason?: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setMemberMuteAdd(
  this: Axios,
  params: setMemberMuteAdd.Request
): ApiResponse<setMemberMuteAdd.Response> {
  return this.post("/api/v1/member/mute/add", params);
}
