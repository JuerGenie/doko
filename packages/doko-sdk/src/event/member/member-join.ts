import { BusinessEventData } from "../../event/business-event-data.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawIslandMemberJoinEvent = BusinessEventData<
  DodoEventType.IslandMemberJoin,
  {
    islandId: string;
    dodoId: string;
    modifyTime: string;
  }
>;

export interface MemberJoinEvent {
  data: RawIslandMemberJoinEvent;
}

declare global {
  interface DokoEventMap {
    "member.join": (data: MemberJoinEvent) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.IslandMemberJoin>((doko) => ({
  eventType: DodoEventType.IslandMemberJoin,
  process(evt) {
    doko.event.emitAsync("member.join", {
      data: evt,
    });
  },
}));
