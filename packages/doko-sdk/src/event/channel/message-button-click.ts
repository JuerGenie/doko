import { Member } from "../../model/data/member.js";
import { Personal } from "../../model/data/personal.js";
import { BusinessData } from "../../model/event/event-data.js";
import { DodoEventType } from "../../model/event/event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawChannelMessageButtonClickEvent = BusinessData<
  DodoEventType.ChannelCardButtonClick,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: Personal;
    member: Member;
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
