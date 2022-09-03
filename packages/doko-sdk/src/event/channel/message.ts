import { Member } from "../../model/data/member.js";
import { Personal } from "../../model/data/personal.js";
import { ReferenceMessage } from "../../model/data/reference-message.js";
import { BusinessData } from "../../model/event/event-data.js";
import { DodoEventType } from "../../model/event/event-type.js";
import {
  CardMessage,
  FileMessage,
  MessageType,
  PictureMessage,
  ShareMessage,
  TextMessage,
  VideoMessage,
} from "../../model/event/message-data.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawChannelMessageEvent = BusinessData<
  DodoEventType.ChannelMessage,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: Personal;
    member: Member;
    reference?: ReferenceMessage;
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

// type EventType = keyof typeof MessageType;
// type EventMap<
//   K extends EventType = EventType,
//   M extends typeof MessageType[K] = typeof MessageType[K]
// > = {
//   [key in `channel.message.${string.ToLowerCase<K>}`]: (
//     data: ChannelMessageEvent<M>
//   ) => Awaitable<void>;
// };
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
