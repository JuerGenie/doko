import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
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

declare module "doko-sdk" {
  interface CustomHook {
    "channel.card.list.submit": EventHook<ChannelMessageListSubmitEvent>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelCardListSubmit>(
  (doko) => {
    return {
      eventType: DodoEventType.ChannelCardListSubmit,
      process(evt) {
        doko.hook.getHook("channel.card.list.submit").trigger({ data: evt });
      },
    };
  }
);
