import { PersonalModel } from "doko-sdk/model/personal.js";
import { BusinessEventData } from "doko-sdk/event/business-event-data.js";
import { DodoEventType } from "doko-sdk/event/dodo-event-type.js";
import {
  PictureMessage,
  TextMessage,
  VideoMessage,
} from "doko-sdk/model/message.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawPersonalMessageEvent = BusinessEventData<
  DodoEventType.PersonalMessage,
  {
    dodoId: string;
    personal: PersonalModel;
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
