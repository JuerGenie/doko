import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 撤回消息
 * @see https://open.imdodo.com/dev/api/channel-text.html#%E7%BC%96%E8%BE%91%E6%B6%88%E6%81%AF
 */
export namespace setChannelMessageWithdraw {
  export interface Request {
    messageId: string;
    reason?: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setChannelMessageWithdraw(
  api: Axios,
  params: setChannelMessageWithdraw.Request
): ApiResponse<setChannelMessageWithdraw.Response> {
  return api.post("/api/v1/channel/message/withdraw", params);
}
