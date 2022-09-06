import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { ReferenceMessageModel } from "../../model/reference-message.js";
import { BusinessEventData } from "../../event/business-event-data.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import {
  CardMessage,
  FileMessage,
  MessageType,
  PictureMessage,
  ShareMessage,
  TextMessage,
  VideoMessage,
} from "../../model/message.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

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

declare global {
  interface DokoEventMap /* extends EventMap */ {
    "channel.message.card": (
      evt: ChannelMessageEvent<MessageType.Card>
    ) => Awaitable<void>;
    "channel.message.file": (
      evt: ChannelMessageEvent<MessageType.File>
    ) => Awaitable<void>;
    "channel.message.picture": (
      evt: ChannelMessageEvent<MessageType.Picture>
    ) => Awaitable<void>;
    "channel.message.share": (
      evt: ChannelMessageEvent<MessageType.Share>
    ) => Awaitable<void>;
    "channel.message.text": (
      evt: ChannelMessageEvent<MessageType.Text>
    ) => Awaitable<void>;
    "channel.message.video": (
      evt: ChannelMessageEvent<MessageType.Video>
    ) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelMessage>((doko) => ({
  eventType: DodoEventType.ChannelMessage,
  process(evt) {
    doko.event.emitAsync(
      `channel.message.${MessageType[evt.eventBody.messageType].toLowerCase()}`,
      {
        data: evt,
      }
    );
  },
}));
