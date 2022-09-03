import { Member } from "../../model/data/member.js";
import { Personal } from "../../model/data/personal.js";
import { BusinessData } from "../../model/event/event-data.js";
import { DodoEventType } from "../../model/event/event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawChannelMessageFormSubmitEvent = BusinessData<
  DodoEventType.ChannelCardFormSubmit,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: Personal;
    member: Member;
    /** 交互自定义ID */
    interactCustomId: string;
    formData: Array<{ key: string; value: string }>;
  }
>;

export interface ChannelMessageFormSubmitEvent {
  data: RawChannelMessageFormSubmitEvent;
}

declare global {
  interface DokoEventMap {
    "channel.card.form.submit": (
      data: ChannelMessageFormSubmitEvent
    ) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelCardFormSubmit>(
  (doko) => ({
    eventType: DodoEventType.ChannelCardFormSubmit,
    process(evt) {
      doko.event.emitAsync("channel.card.form.submit", {
        data: evt,
      });
    },
  })
);
