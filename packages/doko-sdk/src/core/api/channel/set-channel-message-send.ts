import { ApiResponse, DodoResponse } from "../index.js";
import {
  DokoMessage,
  MessageType,
  SendableDokoMessage,
} from "../../model/message.js";
import { Axios, AxiosResponse } from "axios";

/** 发送消息 */
export namespace setChannelMessageSend {
  export type Request<T extends MessageType = MessageType> = {
    channelId: string;
    /** 回复消息的ID */
    referencedMessageId?: string;
    /** 向该成员发送频道私信 */
    dodoId?: string;
  } & SendableDokoMessage<T>;

  export interface Response<T extends MessageType>
    extends DodoResponse<{
      messageId: string;
      messageType: T;
      messageBody?: DokoMessage<T>["messageBody"];
    }> {}
}

export async function setChannelMessageSend<T extends MessageType>(
  this: Axios,
  params: setChannelMessageSend.Request<T>
): ApiResponse<setChannelMessageSend.Response<T>> {
  const res: AxiosResponse<setChannelMessageSend.Response<T>> = await this.post(
    "/api/v1/channel/message/send",
    params
  );
  res.data.data.messageType = params.messageType;
  res.data.data.messageBody = params.messageBody;
  return res;
}
