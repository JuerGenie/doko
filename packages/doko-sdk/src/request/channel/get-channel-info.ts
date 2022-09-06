import { ApiResponse, DokoResponse } from "../index.js";
import { Axios } from "axios";
import { ChannelModel } from "../../index.js";

/** 获取频道信息 */
export namespace getChannelInfo {
  export interface Request {
    channelId: string;
  }
  export interface Response extends DokoResponse<ChannelModel> {}
}

export function getChannelInfo(
  api: Axios,
  params: getChannelInfo.Request
): ApiResponse<getChannelInfo.Response> {
  return api.post("/api/v1/channel/info", params);
}
