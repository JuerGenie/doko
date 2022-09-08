import { EventPersonalModel } from "../../model/event-personal.js";
import { EventMemberModel } from "../../model/event-member.js";
import { BusinessEventData } from "../../event/index.js";
import { EventHook } from "@vueuse/shared";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { ArticleType } from "../../api/channel/set-channel-article-remove.js";

export type RawChannelArticleEvent = BusinessEventData<
  DodoEventType.ChannelArticleEvent,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    personal: EventPersonalModel;
    member: EventMemberModel;
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

export default defineEventProcessor((doko) => {
  class EventEnhance implements RawChannelArticleEvent {
    eventId!: string;
    eventType!: DodoEventType.ChannelArticleEvent;
    eventBody!: RawChannelArticleEvent["eventBody"];
    timestamp!: number;

    remove() {
      return doko.dodo
        .island()
        .with(this.eventBody)
        .channel()
        .with(this.eventBody)
        .article()
        .remove({
          type: ArticleType.Article,
          id: this.eventBody.articleId,
        });
    }
  }

  return {
    eventType: DodoEventType.ChannelArticleEvent,
    process(evt: RawChannelArticleEvent) {
      Object.setPrototypeOf(evt, EventEnhance.prototype);
      doko.hook.getHook("channel.article").trigger({ data: evt });
    },
  };
});
