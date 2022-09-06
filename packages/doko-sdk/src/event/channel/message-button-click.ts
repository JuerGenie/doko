import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
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

declare module "doko-sdk" {
  interface CustomHook {
    "channel.card.button.click": EventHook<ChannelMessageButtonClickEvent>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelCardButtonClick>(
  (doko) => {
    return {
      eventType: DodoEventType.ChannelCardButtonClick,
      process(evt) {
        doko.hook.getHook("channel.card.button.click").trigger({ data: evt });
      },
    };
  }
);
