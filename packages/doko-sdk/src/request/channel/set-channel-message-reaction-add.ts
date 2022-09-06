import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";
import type { Emoji } from "../../index.js";

/**
 * 添加表情反应
 * @see https://open.imdodo.com/dev/api/channel-text.html#%E6%92%A4%E5%9B%9E%E6%B6%88%E6%81%AF
 */
export namespace setChannelMessageReactionAdd {
  export interface Request {
    messageId: string;
    emoji: Emoji;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setChannelMessageReactionAdd(
  api: Axios,
  params: setChannelMessageReactionAdd.Request
): ApiResponse<setChannelMessageReactionAdd.Response> {
  return api.post("/api/v1/channel/message/reaction/add", params);
}
