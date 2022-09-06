import type {
  CardMessage,
  FileMessage,
  PictureMessage,
  ShareMessage,
  TextMessage,
  VideoMessage,
} from "../../index.js";
import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 编辑消息
 * @see https://open.imdodo.com/dev/api/channel-text.html#%E7%BC%96%E8%BE%91%E6%B6%88%E6%81%AF
 */
export namespace setChannelMessageEdit {
  export interface Request {
    messageId: string;
    messageBody: (
      | CardMessage
      | TextMessage
      | VideoMessage
      | PictureMessage
      | ShareMessage
      | FileMessage
    )["messageBody"];
  }
  export interface Response extends DokoResponse<void> {}
}

export function setChannelMessageEdit(
  api: Axios,
  params: setChannelMessageEdit.Request
): ApiResponse<setChannelMessageEdit.Response> {
  return api.post("/api/v1/channel/message/edit", params);
}
