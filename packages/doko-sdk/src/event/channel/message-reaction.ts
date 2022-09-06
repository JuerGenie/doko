import {
  ReactionEmojiModel,
  ReactionTargetModel,
  ReactionType,
} from "../../model/reaction.js";
import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";

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

declare module "doko-sdk" {
  interface CustomHook {
    "channel.reaction": EventHook<ChannelMessageReactionEvent>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelMessageReaction>(
  (doko) => {
    return {
      eventType: DodoEventType.ChannelMessageReaction,
      process(evt) {
        doko.hook.getHook("channel.reaction").trigger({ data: evt });
      },
    };
  }
);
