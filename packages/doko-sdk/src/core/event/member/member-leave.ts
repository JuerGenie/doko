import { EventPersonalModel } from "../../model/event-personal.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook, createEventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
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
    personal: EventPersonalModel;
    leaveType: MemberLeaveType;
    operateDoDoId: string;
    modifyTime: string;
  }
>;

export interface IslandMemberLeaveEvent {
  data: RawIslandMemberLeaveEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "island.member.leave": EventHook<IslandMemberLeaveEvent>;
  }
}

export default defineEventProcessor((doko) => {
  return {
    eventType: DodoEventType.IslandMemberLeave,
    process(evt: RawIslandMemberLeaveEvent) {
      doko.hook.getHook("island.member.leave").trigger({ data: evt });
    },
  };
});
