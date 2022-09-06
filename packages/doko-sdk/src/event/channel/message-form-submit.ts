import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/business-event-data.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawChannelMessageFormSubmitEvent = BusinessEventData<
  DodoEventType.ChannelCardFormSubmit,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: PersonalModel;
    member: MemberModel;
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
