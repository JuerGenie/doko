import { EventPersonalModel, EventMemberModel } from "../../model/index.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { defineResponse, Responsive } from "../utils.js";

export type RawChannelMessageFormSubmitEvent = BusinessEventData<
  DodoEventType.ChannelCardFormSubmit,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: EventPersonalModel;
    member: EventMemberModel;
    /** 交互自定义ID */
    interactCustomId: string;
    formData: Array<{ key: string; value: string }>;
  }
>;

export interface ChannelMessageFormSubmitEvent extends Responsive {
  data: RawChannelMessageFormSubmitEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "channel.card.form.submit": EventHook<ChannelMessageFormSubmitEvent>;
  }
}

export default defineEventProcessor((doko) => {
  return {
    eventType: DodoEventType.ChannelCardFormSubmit,
    process(evt: RawChannelMessageFormSubmitEvent) {
      doko.hook.getHook("channel.card.form.submit").trigger({
        data: evt,
        response: defineResponse(doko, evt.eventBody),
      });
    },
  };
});
