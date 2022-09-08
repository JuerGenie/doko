import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 添加成员到机器人邀请列表
 * @see https://open.imdodo.com/dev/api/bot.html#%E6%B7%BB%E5%8A%A0%E6%88%90%E5%91%98%E5%88%B0%E6%9C%BA%E5%99%A8%E4%BA%BA%E9%82%80%E8%AF%B7%E5%88%97%E8%A1%A8
 */
export namespace setBotInviteAdd {
  export interface Request {
    dodoId: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setBotInviteAdd(
  this: Axios,
  params: setBotInviteAdd.Request
): ApiResponse<setBotInviteAdd.Response> {
  return this.post("/api/v1/bot/invite/add", params);
}
