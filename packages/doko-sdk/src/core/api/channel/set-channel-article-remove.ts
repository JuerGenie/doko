import { ApiResponse, DodoResponse } from "../index.js";
import { Axios } from "axios";

/**
 * 删除帖子评论回复
 * @see https://open.imdodo.com/dev/api/channel-article.html#%E5%88%A0%E9%99%A4%E5%B8%96%E5%AD%90%E8%AF%84%E8%AE%BA%E5%9B%9E%E5%A4%8D
 */
export namespace setChannelArticleRemove {
  export interface Request {
    channelId: string;
    type: ArticleType;
    /**
     * 目标ID。
     * - 当 type 为 `ArticleType.Article` 时，此项为`帖子ID`
     * - 当 type 为 `ArticleType.Comment` 时，此项为`帖子评论ID`
     * - 当 type 为 `ArticleType.Reply` 时，此项为`帖子评论回复ID`
     * @see {ArticleType}
     */
    id: string;
  }
  export interface Response extends DodoResponse<void> {}
}

export enum ArticleType {
  Article = 1,
  Comment = 2,
  Reply = 3,
}

export function setChannelArticleRemove(
  this: Axios,
  params: setChannelArticleRemove.Request
): ApiResponse<setChannelArticleRemove.Response> {
  return this.post("/api/v1/channel/article/remove", params);
}
