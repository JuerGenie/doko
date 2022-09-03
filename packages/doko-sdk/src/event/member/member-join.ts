import { BusinessData } from "../../model/event/event-data.js";
import { DodoEventType } from "../../model/event/event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawMemberJoinEvent = BusinessData<
  DodoEventType.MemberJoin,
  {
    islandId: string;
    dodoId: string;
    modifyTime: string;
  }
>;

export interface MemberJoinEvent {
  data: RawMemberJoinEvent;
}

declare global {
  interface DokoEventMap {
    "member.join": (data: MemberJoinEvent) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.MemberJoin>((doko) => ({
  eventType: DodoEventType.MemberJoin,
  process(evt) {
    doko.event.emitAsync("member.join", {
      data: evt,
    });
  },
}));
