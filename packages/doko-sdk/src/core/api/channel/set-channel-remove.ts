import type { ApiResponse, DodoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 删除频道
 * @see https://open.imdodo.com/dev/api/channel.html#%E5%88%A0%E9%99%A4%E9%A2%91%E9%81%93
 */
export namespace setChannelRemove {
  export interface Request {
    islandId: string;
    channelId: string;
  }
  export interface Response extends DodoResponse<void> {}
}

export function setChannelRemove(
  this: Axios,
  params: setChannelRemove.Request
): ApiResponse<setChannelRemove.Response> {
  return this.post("/api/v1/channel/remove", params);
}
