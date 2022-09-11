import {
  EventPersonalModel,
  EventMemberModel,
  ReferenceMessageModel,
} from "../../model/index.js";
import { BusinessEventData } from "../../event/index.js";
import { MessageType, DokoMessage } from "../../model/message.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { string } from "typescript-lodash";
import { defineResponse, Responsive } from "../utils.js";

export type RawChannelMessageEvent<T extends MessageType = MessageType> =
  BusinessEventData<
    DodoEventType.ChannelMessage,
    {
      islandId: string;
      channelId: string;
      dodoId: string;
      messageId: string;
      personal: EventPersonalModel;
      member: EventMemberModel;
      reference?: ReferenceMessageModel;
    } & DokoMessage<T>
  >;

export interface ChannelMessageEvent<
  T extends MessageType = MessageType,
  D extends RawChannelMessageEvent<T> = RawChannelMessageEvent<T>
> extends Responsive {
  data: D;

  /** At相关数据 */
  at: D["eventBody"] extends { messageBody: { content?: string } }
    ? {
        /** 被At者dodoId列表 */
        member: string[];
        /** 被At角色组id列表 */
        role: string[];

        /** 是否At了所有人 */
        all?: boolean;
        /** 是否At了在线成员 */
        online?: boolean;
        /** 是否At了机器人 */
        me?: boolean;
      }
    : undefined;
}

declare module "doko-sdk" {
  interface CustomHook {
    "channel.message.card": EventHook<ChannelMessageEvent<MessageType.Card>>;
    "channel.message.file": EventHook<ChannelMessageEvent<MessageType.File>>;
    "channel.message.picture": EventHook<
      ChannelMessageEvent<MessageType.Picture>
    >;
    "channel.message.share": EventHook<ChannelMessageEvent<MessageType.Share>>;
    "channel.message.text": EventHook<ChannelMessageEvent<MessageType.Text>>;
    "channel.message.video": EventHook<ChannelMessageEvent<MessageType.Video>>;

    "channel.message": EventHook<ChannelMessageEvent>;
  }
}

export default defineEventProcessor(async (doko) => {
  const bot = doko.store.useBot();

  return {
    eventType: DodoEventType.ChannelMessage,
    async process(evt: RawChannelMessageEvent) {
      let at: ChannelMessageEvent<MessageType.Text>["at"] | undefined;
      // 解析At数据
      if (
        evt.eventBody.messageType === MessageType.Card ||
        evt.eventBody.messageType === MessageType.Text
      ) {
        await bot.isReady;

        let atList = [
          ...(evt.eventBody.messageBody.content?.matchAll(/<@([^>]+)>/g) ?? []),
        ].map((matcher) => matcher[1]);
        const all = atList.includes("all");
        const online = atList.includes("online");
        atList = atList.filter((id) => !["all", "online"].includes(id));

        at = {
          member: atList
            .filter((id) => id.startsWith("!"))
            .map((id) => id.slice(1)),
          role: atList
            .filter((id) => id.startsWith("&"))
            .map((id) => id.slice(1)),
          all,
          online,
          me: atList.includes(bot.dodoId),
        };
      }

      doko.hook.trigger(
        [
          "channel.message",
          `channel.message.${
            MessageType[
              evt.eventBody.messageType
            ].toLowerCase() as string.ToLowerCase<keyof typeof MessageType>
          }`,
        ],
        {
          data: evt as any,
          response: defineResponse(doko, evt.eventBody),
          at,
        }
      );
    },
  };
});
