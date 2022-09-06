import { ApiResponse, DokoResponse } from "../index.js";
import { Axios } from "axios";
import { Emoji } from "../../index.js";

/**
 * 取消表情反应
 * @see https://open.imdodo.com/dev/api/channel-text.html#%E5%8F%96%E6%B6%88%E8%A1%A8%E6%83%85%E5%8F%8D%E5%BA%94
 */
export namespace setChannelMessageReactionRemove {
  export interface Request {
    messageId: string;
    emoji: Emoji;
    dodoId?: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setChannelMessageReactionRemove(
  api: Axios,
  params: setChannelMessageReactionRemove.Request
): ApiResponse<setChannelMessageReactionRemove.Response> {
  return api.post("/api/v1/channel/message/reaction/remove", params);
}
