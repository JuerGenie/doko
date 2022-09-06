import { BusinessEventData } from "doko-sdk/event/business-event-data.js";
import { DodoEventType } from "doko-sdk/event/dodo-event-type.js";
import { Awaitable } from "@vueuse/core";
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

declare global {
  interface DokoEventMap {
    "channel.voice.member.join": (
      evt: ChannelVoiceMemberJoinEvent
    ) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelVoiceMemberJoin>(
  (doko) => ({
    eventType: DodoEventType.ChannelVoiceMemberJoin,
    process(evt) {
      doko.event.emitAsync(`channel.voice.member.join`, {
        data: evt,
      });
    },
  })
);
