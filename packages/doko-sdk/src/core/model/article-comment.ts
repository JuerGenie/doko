import { EventMemberModel, EventPersonalModel } from "./index.js";

export interface ArticleComment {
  islandId: string;
  channelId: string;
  dodoId: string;
  personal: EventPersonalModel;
  member: EventMemberModel;
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
