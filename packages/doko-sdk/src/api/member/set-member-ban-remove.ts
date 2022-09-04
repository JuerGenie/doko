import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 取消成员永久封禁
 * @see https://open.imdodo.com/dev/api/member.html#%E5%8F%96%E6%B6%88%E6%88%90%E5%91%98%E6%B0%B8%E4%B9%85%E5%B0%81%E7%A6%81
 */
export namespace setMemberBanRemove {
  export interface Request {
    islandId: string;
    dodoId: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setMemberBanRemove(
  api: Axios,
  params: setMemberBanRemove.Request
): ApiResponse<setMemberBanRemove.Response> {
  return api.post("/api/v1/member/ban/remove", params);
}
