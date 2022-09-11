import type { ApiResponse, DodoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 取消成员禁言
 * @see https://open.imdodo.com/dev/api/member.html#%E5%8F%96%E6%B6%88%E6%88%90%E5%91%98%E7%A6%81%E8%A8%80
 */
export namespace setMemberMuteRemove {
  export interface Request {
    islandId: string;
    dodoId: string;
  }
  export interface Response extends DodoResponse<void> {}
}

export function setMemberMuteRemove(
  this: Axios,
  params: setMemberMuteRemove.Request
): ApiResponse<setMemberMuteRemove.Response> {
  return this.post("/api/v1/member/mute/remove", params);
}
