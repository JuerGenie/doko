import type { ApiResponse, DodoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 编辑频道
 * @see https://open.imdodo.com/dev/api/channel.html#%E5%88%9B%E5%BB%BA%E9%A2%91%E9%81%93
 */
export namespace setChannelEdit {
  export interface Request {
    islandId: string;
    channelId: string;
    channelName?: string;
  }
  export interface Response extends DodoResponse<void> {}
}

export function setChannelEdit(
  this: Axios,
  params: setChannelEdit.Request
): ApiResponse<setChannelEdit.Response> {
  return this.post("/api/v1/channel/edit", params);
}
