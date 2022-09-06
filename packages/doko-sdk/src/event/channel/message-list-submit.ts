import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/business-event-data.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawChannelMessageListSubmitEvent = BusinessEventData<
  DodoEventType.ChannelCardListSubmit,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: PersonalModel;
    member: MemberModel;
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
