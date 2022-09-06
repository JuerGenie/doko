import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/business-event-data.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import {
  PictureMessage,
  TextMessage,
  VideoMessage,
} from "../../model/message.js";
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
