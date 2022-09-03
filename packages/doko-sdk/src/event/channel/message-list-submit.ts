import { Member } from "../../model/data/member.js";
import { Personal } from "../../model/data/personal.js";
import { BusinessData } from "../../model/event/event-data.js";
import { DodoEventType } from "../../model/event/event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawChannelMessageListSubmitEvent = BusinessData<
  DodoEventType.ChannelCardListSubmit,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: Personal;
    member: Member;
    /** 交互自定义ID */
    interactCustomId: string;
    listData: Array<{ name: string }>;
  }
>;

export interface ChannelMessageListSubmitEvent {
  data: RawChannelMessageListSubmitEvent;
}

declare global {
  interface DokoEventMap {
    "channel.card.list.submit": (
      data: ChannelMessageListSubmitEvent
    ) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelCardListSubmit>(
  (doko) => ({
    eventType: DodoEventType.ChannelCardListSubmit,
    process(evt) {
      doko.event.emitAsync("channel.card.list.submit", {
        data: evt,
      });
    },
  })
);
