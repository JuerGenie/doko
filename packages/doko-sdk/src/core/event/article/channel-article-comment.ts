import { BusinessEventData } from "../../event/index.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { ArticleComment } from "../../model/article-comment.js";
import { EventHook } from "@vueuse/shared";
import { ArticleType } from "../../api/channel/set-channel-article-remove.js";

export type RawChannelArticleCommentEvent = BusinessEventData<
  DodoEventType.ChannelArticleCommentEvent,
  ArticleComment
>;

export interface ChannelArticleCommentEvent {
  data: RawChannelArticleCommentEvent;
}

declare module "doko-sdk" {
  interface CustomHook {
    "channel.article.comment": EventHook<ChannelArticleCommentEvent>;
  }
}

export default defineEventProcessor((doko) => {
  class EventEnhance implements RawChannelArticleCommentEvent {
    eventId!: string;
    eventType!: DodoEventType.ChannelArticleCommentEvent;
    eventBody!: ArticleComment;
    timestamp!: number;

    remove() {
      const api = doko.dodo
        .island()
        .with(this.eventBody)
        .channel()
        .with(this.eventBody)
        .article();
      if (!this.eventBody.replyId) {
        // 如果是评论
        return api.remove({
          type: ArticleType.Comment,
          id: this.eventBody.commentId,
        });
      } else {
        // 如果是评论回复
        return api.remove({
          type: ArticleType.Reply,
          id: this.eventBody.replyId,
        });
      }
    }
  }

  return {
    eventType: DodoEventType.ChannelArticleCommentEvent,
    process(evt: RawChannelArticleCommentEvent) {
      Object.setPrototypeOf(evt, EventEnhance.prototype);
      doko.hook.getHook("channel.article.comment").trigger({ data: evt });
    },
  };
});
