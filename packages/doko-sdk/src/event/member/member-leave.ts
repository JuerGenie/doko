import { PersonalModel } from "doko-sdk/model/personal.js";
import { BusinessEventData } from "doko-sdk/event/business-event-data.js";
import { DodoEventType } from "doko-sdk/event/dodo-event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export enum MemberLeaveType {
  Active = 1,
  Passive = 2,
}

export type RawIslandMemberLeaveEvent = BusinessEventData<
  DodoEventType.IslandMemberLeave,
  {
    islandId: string;
    dodoId: string;
    personal: PersonalModel;
    leaveType: MemberLeaveType;
    operateDoDoId: string;
    modifyTime: string;
  }
>;

export interface IslandMemberLeaveEvent {
  data: RawIslandMemberLeaveEvent;
}

declare global {
  interface DokoEventMap {
    "member.leave": (data: IslandMemberLeaveEvent) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.IslandMemberLeave>(
  (doko) => ({
    eventType: DodoEventType.IslandMemberLeave,
    process(evt) {
      doko.event.emitAsync("member.leave", {
        data: evt,
      });
    },
  })
);
