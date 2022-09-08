import { EventPersonalModel, EventMemberModel } from "../../model/index.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { defineResponse, Responsive } from "../utils.js";

export type RawChannelMessageListSubmitEvent = BusinessEventData<
  DodoEventType.ChannelCardListSubmit,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: EventPersonalModel;
    member: EventMemberModel;
    /** 交互自定义ID */
    interactCustomId: string;
    listData: Array<{ name: string }>;
  }
>;

export interface ChannelMessageListSubmitEvent extends Responsive {
  data: RawChannelMessageListSubmitEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "channel.card.list.submit": EventHook<ChannelMessageListSubmitEvent>;
  }
}

export default defineEventProcessor((doko) => {
  return {
    eventType: DodoEventType.ChannelCardListSubmit,
    process(evt: RawChannelMessageListSubmitEvent) {
      doko.hook.getHook("channel.card.list.submit").trigger({
        data: evt,
        response: defineResponse(doko, evt.eventBody),
      });
    },
  };
});
