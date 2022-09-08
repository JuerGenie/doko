import { BusinessEventData } from "../../event/index.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { EventHook } from "@vueuse/shared";
import { defineEventProcessor } from "../define.js";

export type RawIslandMemberJoinEvent = BusinessEventData<
  DodoEventType.IslandMemberJoin,
  {
    islandId: string;
    dodoId: string;
    modifyTime: string;
  }
>;

export interface IslandMemberJoinEvent {
  data: RawIslandMemberJoinEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "island.member.join": EventHook<IslandMemberJoinEvent>;
  }
}

export default defineEventProcessor((doko) => {
  return {
    eventType: DodoEventType.IslandMemberJoin,
    process(evt: RawIslandMemberJoinEvent) {
      doko.hook.getHook("island.member.join").trigger({ data: evt });
    },
  };
});
