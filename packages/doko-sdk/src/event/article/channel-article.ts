import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";

export type RawChannelArticleEvent = BusinessEventData<
  DodoEventType.ChannelArticleEvent,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    personal: PersonalModel;
    member: MemberModel;
    articleId: string;
    title: string;
    imageList: string[];
    content: string;
  }
>;

export interface ChannelArticleEvent {
  data: RawChannelArticleEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "channel.article": EventHook<ChannelArticleEvent>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelArticleEvent>(
  (doko) => {
    return {
      eventType: DodoEventType.ChannelArticleEvent,
      process(evt) {
        doko.hook.getHook("channel.article").trigger({ data: evt });
      },
    };
  }
);
