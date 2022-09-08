import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 移除成员出机器人邀请列表
 * @see https://open.imdodo.com/dev/api/bot.html#%E7%A7%BB%E9%99%A4%E6%88%90%E5%91%98%E5%87%BA%E6%9C%BA%E5%99%A8%E4%BA%BA%E9%82%80%E8%AF%B7%E5%88%97%E8%A1%A8
 */
export namespace setBotInviteRemove {
  export interface Request {
    dodoId: string;
  }
  export interface Response extends DokoResponse<{}> {}
}

export function setBotInviteRemove(
  this: Axios,
  params: setBotInviteRemove.Request
): ApiResponse<setBotInviteRemove.Response> {
  return this.post("/api/v1/bot/invite/remove", params);
}
