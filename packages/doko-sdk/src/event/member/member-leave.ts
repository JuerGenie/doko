import { Personal } from "../../model/data/personal.js";
import { BusinessData } from "../../model/event/event-data.js";
import { DodoEventType } from "../../model/event/event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export enum MemberLeaveType {
  Active = 1,
  Passive = 2,
}

export type RawMemberLeaveEvent = BusinessData<
  DodoEventType.MemberLeave,
  {
    islandId: string;
    dodoId: string;
    personal: Personal;
    leaveType: MemberLeaveType;
    operateDoDoId: string;
    modifyTime: string;
  }
>;

export interface MemberLeaveEvent {
  data: RawMemberLeaveEvent;
}

declare global {
  interface DokoEventMap {
    "member.leave": (data: MemberLeaveEvent) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.MemberLeave>((doko) => ({
  eventType: DodoEventType.MemberLeave,
  process(evt) {
    doko.event.emitAsync("member.leave", {
      data: evt,
    });
  },
}));
