import { Doko, SendableDokoMessage } from "../../index.js";

export function defineResponse(
  doko: Doko,
  evt: {
    dodoId: string;
    messageId?: string;
    islandId: string;
    channelId: string;
  }
) {
  return (
    params: SendableDokoMessage,
    options: {
      /** 回复此条消息 */
      reply?: boolean;
      /** 向发送者发送频道私信 */
      personalOnly?: boolean;
    } = {}
  ) => {
    return doko.dodo
      .island()
      .with(evt)
      .channel()
      .with(evt)
      .message()
      .send({
        ...params,
        referencedMessageId:
          options.reply && evt.messageId ? evt.messageId : undefined,
        dodoId: options.personalOnly ? evt.dodoId : undefined,
      });
  };
}

export interface Responsive {
  response: ReturnType<typeof defineResponse>;
}
