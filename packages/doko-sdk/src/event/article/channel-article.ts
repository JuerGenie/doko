import { MemberModel } from "doko-sdk/model/member.js";
import { PersonalModel } from "doko-sdk/model/personal.js";
import { BusinessEventData } from "doko-sdk/event/business-event-data.js";
import { DodoEventType } from "doko-sdk/event/dodo-event-type.js";
import { Awaitable } from "@vueuse/core";
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

declare global {
  interface DokoEventMap {
    "channel.article": (data: ChannelArticleEvent) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelArticleEvent>(
  (doko) => ({
    eventType: DodoEventType.ChannelArticleEvent,
    process(evt) {
      doko.event.emitAsync("channel.article", {
        data: evt,
      });
    },
  })
);
