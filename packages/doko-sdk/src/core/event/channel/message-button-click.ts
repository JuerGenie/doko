import { EventPersonalModel, EventMemberModel } from "../../model/index.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { defineResponse, Responsive } from "../utils.js";

export type RawChannelMessageButtonClickEvent = BusinessEventData<
  DodoEventType.ChannelCardButtonClick,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: EventPersonalModel;
    member: EventMemberModel;
    /** 交互自定义ID */
    interactCustomId: string;
    value: string;
  }
>;

export interface ChannelMessageButtonClickEvent extends Responsive {
  data: RawChannelMessageButtonClickEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "channel.card.button.click": EventHook<ChannelMessageButtonClickEvent>;
  }
}

export default defineEventProcessor((doko) => {
  return {
    eventType: DodoEventType.ChannelCardButtonClick,
    process(evt: RawChannelMessageButtonClickEvent) {
      doko.hook.getHook("channel.card.button.click").trigger({
        data: evt,
        response: defineResponse(doko, evt.eventBody),
      });
    },
  };
});
