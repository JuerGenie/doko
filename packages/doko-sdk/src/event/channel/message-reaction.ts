import {
  ReactionEmoji,
  ReactionTarget,
  ReactionType,
} from "../../model/data/reaction.js";
import { Member } from "../../model/data/member.js";
import { Personal } from "../../model/data/personal.js";
import { BusinessData } from "../../model/event/event-data.js";
import { DodoEventType } from "../../model/event/event-type.js";
import { defineEventProcessor } from "../define.js";
import { Awaitable } from "@vueuse/core";

export type RawChannelMessageReactionEvent = BusinessData<
  DodoEventType.ChannelMessageReaction,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: Personal;
    member: Member;
    reactionTarget: ReactionTarget;
    reactionEmoji: ReactionEmoji;
    reactionType: ReactionType;
  }
>;

export interface ChannelMessageReactionEvent {
  data: RawChannelMessageReactionEvent;
}

declare global {
  interface DokoEventMap {
    "channel.reaction": (data: ChannelMessageReactionEvent) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelMessageReaction>(
  (doko) => ({
    eventType: DodoEventType.ChannelMessageReaction,
    process(evt) {
      doko.event.emitAsync("channel.reaction", {
        data: evt,
      });
    },
  })
);
