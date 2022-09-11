import { getLogger } from "../../utils/logger.js";
import { Doko, MessageType, SendableDokoMessage } from "../../index.js";

const logger = getLogger("Utils");

export function defineResponse(
  doko: Doko,
  evt: {
    dodoId: string;
    messageId?: string;
    islandId: string;
    channelId: string;
  }
) {
  logger.debug("define response ->", evt.messageId);

  return <T extends MessageType>(
    params: SendableDokoMessage<T>,
    options: {
      /** 回复此条消息 */
      reply?: boolean;
      /** 向发送者发送频道私信 */
      personalOnly?: boolean;
    } = {}
  ) => {
    logger.debug("response ->", [
      `(reply: ${options.reply}, personalOnly: ${options.personalOnly})`,
      JSON.stringify(params),
    ]);
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
