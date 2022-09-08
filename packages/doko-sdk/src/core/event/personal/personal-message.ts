import { EventPersonalModel } from "../../model/event-personal.js";
import { BusinessEventData } from "../../event/index.js";
import {
  PictureMessage,
  TextMessage,
  VideoMessage,
} from "../../model/message.js";
import { EventHook, createEventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";

export type RawPersonalMessageEvent = BusinessEventData<
  DodoEventType.PersonalMessage,
  {
    dodoId: string;
    personal: EventPersonalModel;
    messageId: string;
  } & (TextMessage | PictureMessage | VideoMessage)
>;

export interface PersonalMessageEvent {
  data: RawPersonalMessageEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "personal.message": EventHook<PersonalMessageEvent>;
  }
}

export default defineEventProcessor((doko) => {
  return {
    eventType: DodoEventType.PersonalMessage,
    process(evt: RawPersonalMessageEvent) {
      doko.hook.getHook("personal.message").trigger({ data: evt });
    },
  };
});
