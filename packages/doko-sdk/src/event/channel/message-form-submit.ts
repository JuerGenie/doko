import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
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

declare module "doko-sdk" {
  interface CustomHook {
    "channel.card.form.submit": EventHook<ChannelMessageFormSubmitEvent>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelCardFormSubmit>(
  (doko) => {
    return {
      eventType: DodoEventType.ChannelCardFormSubmit,
      process(evt) {
        doko.hook.getHook("channel.card.form.submit").trigger({ data: evt });
      },
    };
  }
);
