import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook, createEventHook } from "@vueuse/shared";
import { MemberLeaveType } from "../member/member-leave.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";

export type RawChannelVoiceMemberLeaveEvent = BusinessEventData<
  DodoEventType.ChannelVoiceMemberLeave,
  {
    islandId: string;
    dodoId: string;
    personal: PersonalModel;
    leaveType: MemberLeaveType;
    operateDoDoId: string;
    modifyTime: string;
  }
>;

export interface ChannelVoiceMemberLeaveEvent {
  data: RawChannelVoiceMemberLeaveEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "channel.voice.member.leave": EventHook<ChannelVoiceMemberLeaveEvent>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelVoiceMemberLeave>(
  (doko) => {
    return {
      eventType: DodoEventType.ChannelVoiceMemberLeave,
      process(evt) {
        doko.hook.getHook("channel.voice.member.leave").trigger({ data: evt });
      },
    };
  }
);
