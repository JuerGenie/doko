import { ApiResponse, DodoResponse } from "../index.js";
import { Axios } from "axios";

/**
 * 发布帖子
 * @see https://open.imdodo.com/dev/api/channel-article.html#%E5%8F%91%E5%B8%83%E5%B8%96%E5%AD%90
 */
export namespace setChannelArticleAdd {
  export interface Request {
    channelId: string;
    title: string;
    content?: string;
    imageUrl?: string;
  }
  export interface Response
    extends DodoResponse<{
      articleId: string;
    }> {}
}

export function setChannelArticleAdd(
  this: Axios,
  params: setChannelArticleAdd.Request
): ApiResponse<setChannelArticleAdd.Response> {
  return this.post("/api/v1/channel/article/add", params);
}
