import { ApiResponse, DokoResponse } from "../index.js";
import {
  CardMessage,
  PictureMessage,
  TextMessage,
  VideoMessage,
} from "../../model/message.js";
import { Axios } from "axios";

/** 发送消息 */
export namespace setChannelMessageSend {
  export type Request = {
    channelId: string;
    /** 回复消息的ID */
    referencedMessageId?: string;
    /** 向该成员发送频道私信 */
    dodoId?: string;
  } & (TextMessage | PictureMessage | VideoMessage | CardMessage);

  export interface Response
    extends DokoResponse<{
      messageId: string;
    }> {}
}

export function setChannelMessageSend(
  api: Axios,
  params: setChannelMessageSend.Request
): ApiResponse<setChannelMessageSend.Response> {
  return api.post("/api/v1/channel/message/send", params);
}
