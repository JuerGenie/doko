import { Personal } from "../../model/data/personal.js";
import { BusinessData } from "../../model/event/event-data.js";
import { DodoEventType } from "../../model/event/event-type.js";
import {
  PictureMessage,
  TextMessage,
  VideoMessage,
} from "../../model/event/message-data.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawPersonalMessageEvent = BusinessData<
  DodoEventType.PersonalMessage,
  {
    dodoId: string;
    personal: Personal;
    messageId: string;
  } & (TextMessage | PictureMessage | VideoMessage)
>;

export interface PersonalMessageEvent {
  data: RawPersonalMessageEvent;
}

declare global {
  interface DokoEventMap {
    "personal.message": (data: PersonalMessageEvent) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.PersonalMessage>((doko) => ({
  eventType: DodoEventType.PersonalMessage,
  process(evt) {
    doko.event.emitAsync("personal.message", {
      data: evt,
    });
  },
}));
