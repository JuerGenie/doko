import { ApiResponse, DokoResponse } from "../index.js";
import { SendableDokoMessage } from "../../model/message.js";
import { Axios } from "axios";

/** 发送消息 */
export namespace setChannelMessageSend {
  export type Request = {
    channelId: string;
    /** 回复消息的ID */
    referencedMessageId?: string;
    /** 向该成员发送频道私信 */
    dodoId?: string;
  } & SendableDokoMessage;

  export interface Response
    extends DokoResponse<{
      messageId: string;
    }> {}
}

export function setChannelMessageSend(
  this: Axios,
  params: setChannelMessageSend.Request
): ApiResponse<setChannelMessageSend.Response> {
  return this.post("/api/v1/channel/message/send", params);
}
