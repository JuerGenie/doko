import { Member } from "../../model/data/member.js";
import { Personal } from "../../model/data/personal.js";
import { ReferenceMessage } from "../../model/data/reference-message.js";
import { BusinessData } from "../../model/event/event-data.js";
import { DodoEventType } from "../../model/event/event-type.js";
import {
  CardMessage,
  FileMessage,
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

export interface ChannelMessageEvent {
  data: RawChannelMessageEvent;
}

declare global {
  interface DokoEventMap {
    "channel.message": (data: ChannelMessageEvent) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelMessage>((doko) => ({
  eventType: DodoEventType.ChannelMessage,
  process(evt) {
    doko.event.emitAsync("channel.message", {
      data: evt,
    });
  },
}));
