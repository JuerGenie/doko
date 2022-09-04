import type { ApiResponse, DokoResponse } from "../index.js";
import type { Channel } from "doko-sdk/index.js";
import type { Axios } from "axios";

/**  */
export namespace getChannelList {
  export interface Request {
    islandId: string;
  }
  export interface Response extends DokoResponse<Channel[]> {}
}

export function getChannelList(
  api: Axios,
  params: getChannelList.Request
): ApiResponse<getChannelList.Response> {
  return api.post("/api/v1/channel/list", params);
}
