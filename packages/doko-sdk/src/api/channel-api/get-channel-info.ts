import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";
import type { Channel } from "doko-sdk/index.js";

/** 获取频道信息 */
export namespace getChannelInfo {
  export interface Request {
    channelId: string;
  }
  export interface Response extends DokoResponse<Channel> {}
}

export function getChannelInfo(
  api: Axios,
  params: getChannelInfo.Request
): ApiResponse<getChannelInfo.Response> {
  return api.post("/api/v1/channel/info", params);
}