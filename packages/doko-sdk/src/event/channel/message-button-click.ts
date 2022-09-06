import { MemberModel } from "doko-sdk/model/member.js";
import { PersonalModel } from "doko-sdk/model/personal.js";
import { BusinessEventData } from "doko-sdk/event/business-event-data.js";
import { DodoEventType } from "doko-sdk/event/dodo-event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawChannelMessageButtonClickEvent = BusinessEventData<
  DodoEventType.ChannelCardButtonClick,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: PersonalModel;
    member: MemberModel;
    /** 交互自定义ID */
    interactCustomId: string;
    value: string;
  }
>;

export interface ChannelMessageButtonClickEvent {
  data: RawChannelMessageButtonClickEvent;
}

declare global {
  interface DokoEventMap {
    "channel.card.button.click": (
      data: ChannelMessageButtonClickEvent
    ) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelCardButtonClick>(
  (doko) => ({
    eventType: DodoEventType.ChannelCardButtonClick,
    process(evt) {
      doko.event.emitAsync("channel.card.button.click", {
        data: evt,
      });
    },
  })
);
