import type { ApiResponse, DodoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 永久封禁成员
 * @see https://open.imdodo.com/dev/api/member.html#%E6%B0%B8%E4%B9%85%E5%B0%81%E7%A6%81%E6%88%90%E5%91%98
 */
export namespace setMemberBanAdd {
  export interface Request {
    islandId: string;
    dodoId: string;
    noticeChannelId?: string;
    reason?: string;
  }
  export interface Response extends DodoResponse<void> {}
}

export function setMemberBanAdd(
  this: Axios,
  params: setMemberBanAdd.Request
): ApiResponse<setMemberBanAdd.Response> {
  return this.post("/api/v1/member/ban/add", params);
}
