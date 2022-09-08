import { BusinessEventData } from "../../event/index.js";
import { EventHook, createEventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";

export type RawChannelVoiceMemberJoinEvent = BusinessEventData<
  DodoEventType.ChannelVoiceMemberJoin,
  {
    islandId: string;
    dodoId: string;
    modifyTime: string;
  }
>;

export interface ChannelVoiceMemberJoinEvent {
  data: RawChannelVoiceMemberJoinEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "channel.voice.member.join": EventHook<ChannelVoiceMemberJoinEvent>;
  }
}

export default defineEventProcessor((doko) => {
  return {
    eventType: DodoEventType.ChannelVoiceMemberJoin,
    process(evt: RawChannelVoiceMemberJoinEvent) {
      doko.hook.getHook("channel.voice.member.join").trigger({ data: evt });
    },
  };
});
