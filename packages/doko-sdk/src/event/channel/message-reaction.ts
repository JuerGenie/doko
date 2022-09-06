import {
  ReactionEmojiModel,
  ReactionTargetModel,
  ReactionType,
} from "doko-sdk/model/reaction.js";
import { MemberModel } from "doko-sdk/model/member.js";
import { PersonalModel } from "doko-sdk/model/personal.js";
import { BusinessEventData } from "doko-sdk/event/business-event-data.js";
import { DodoEventType } from "doko-sdk/event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { Awaitable } from "@vueuse/core";

export type RawChannelMessageReactionEvent = BusinessEventData<
  DodoEventType.ChannelMessageReaction,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: PersonalModel;
    member: MemberModel;
    reactionTarget: ReactionTargetModel;
    reactionEmoji: ReactionEmojiModel;
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
