import {
  ReactionEmojiModel,
  ReactionTargetModel,
  ReactionType,
  EventPersonalModel,
  EventMemberModel,
} from "../../model/index.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { defineResponse, Responsive } from "../utils.js";

export type RawChannelMessageReactionEvent = BusinessEventData<
  DodoEventType.ChannelMessageReaction,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    messageId: string;
    personal: EventPersonalModel;
    member: EventMemberModel;
    reactionTarget: ReactionTargetModel;
    reactionEmoji: ReactionEmojiModel;
    reactionType: ReactionType;
  }
>;

export interface ChannelMessageReactionEvent extends Responsive {
  data: RawChannelMessageReactionEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "channel.reaction": EventHook<ChannelMessageReactionEvent>;
  }
}

export default defineEventProcessor((doko) => {
  return {
    eventType: DodoEventType.ChannelMessageReaction,
    process(evt: RawChannelMessageReactionEvent) {
      doko.hook.getHook("channel.reaction").trigger({
        data: evt,
        response: defineResponse(doko, evt.eventBody),
      });
    },
  };
});
