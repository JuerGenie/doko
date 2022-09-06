import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/business-event-data.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { Awaitable } from "@vueuse/core";
import { defineEventProcessor } from "../define.js";

export type RawChannelArticleCommentEvent = BusinessEventData<
  DodoEventType.ChannelArticleCommentEvent,
  {
    islandId: string;
    channelId: string;
    dodoId: string;
    personal: PersonalModel;
    member: MemberModel;
    articleId: string;
    commentId: string;
    /**
     * 帖子评论回复ID，可能为空。
     * - 为空时，为评论事件。
     * - 不为空时，为评论回复事件
     */
    replyId?: string;
    imageList: string[];
    content: string;
  }
>;

export interface ChannelArticleCommentEvent {
  data: RawChannelArticleCommentEvent;
}

declare global {
  interface DokoEventMap {
    "channel.article.comment": (
      data: ChannelArticleCommentEvent
    ) => Awaitable<void>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelArticleCommentEvent>(
  (doko) => ({
    eventType: DodoEventType.ChannelArticleCommentEvent,
    process(evt) {
      doko.event.emitAsync("channel.article.comment", {
        data: evt,
      });
    },
  })
);
