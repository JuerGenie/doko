import { MemberModel } from "../../model/member.js";
import { PersonalModel } from "../../model/personal.js";
import { BusinessEventData } from "../../event/index.js";
import { DodoEventType } from "../../event/dodo-event-type.js";
import { defineEventProcessor } from "../define.js";
import { EventHook } from "@vueuse/shared";

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

declare module "doko-sdk" {
  interface CustomHook {
    "channel.article.comment": EventHook<ChannelArticleCommentEvent>;
  }
}

export default defineEventProcessor<DodoEventType.ChannelArticleCommentEvent>(
  (doko) => {
    return {
      eventType: DodoEventType.ChannelArticleCommentEvent,
      process(evt) {
        doko.hook.getHook("channel.article.comment").trigger({ data: evt });
      },
    };
  }
);
