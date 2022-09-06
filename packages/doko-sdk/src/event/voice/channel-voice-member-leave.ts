import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/business-event-data.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";
import { MemberLeaveType } from "../member/member-leave.js";

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

declare global {
  interface DokoEventMap {
    "channel.voice.member.leave": (
      evt: ChannelVoiceMemberLeaveEvent
    ) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelVoiceMemberLeave>(
  (doko) => ({
    eventType: DodoEventType.ChannelVoiceMemberLeave,
    process(evt) {
      doko.event.emitAsync(`channel.voice.member.leave`, {
        data: evt,
      });
    },
  })
);
