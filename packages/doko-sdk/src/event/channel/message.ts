import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { ReferenceMessageModel } from "../../model/reference-message.js";
import { BusinessEventData } from "../../event/index.js";
import {
  CardMessage,
  FileMessage,
  PictureMessage,
  ShareMessage,
  TextMessage,
  VideoMessage,
  MessageType,
} from "../../model/message.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { string } from "typescript-lodash";

export type RawChannelMessageEvent = BusinessEventData<
  DodoEventType.ChannelMessage,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: PersonalModel;
    member: MemberModel;
    reference?: ReferenceMessageModel;
  } & (
    | TextMessage
    | PictureMessage
    | VideoMessage
    | ShareMessage
    | FileMessage
    | CardMessage
  )
>;

export interface ChannelMessageEvent<T extends MessageType = MessageType> {
  data: RawChannelMessageEvent & { eventBody: { messageType: T } };
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

export default defineEventProcessor<DodoEventType.ChannelMessage>((doko) => {
  return {
    eventType: DodoEventType.ChannelMessage,
    process(evt) {
      doko.hook
        .getHook(
          `channel.message.${
            MessageType[
              evt.eventBody.messageType
            ].toLowerCase() as string.ToLowerCase<keyof typeof MessageType>
          }`
        )
        .trigger({ data: evt as any });
    },
  };
});
