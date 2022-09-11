import { ApiResponse, DodoResponse } from "../index.js";
import { Axios } from "axios";
import { ChannelModel } from "../../../index.js";

/** 获取频道信息 */
export namespace getChannelInfo {
  export interface Request {
    channelId: string;
  }
  export interface Response extends DodoResponse<ChannelModel> {}
}

export function getChannelInfo(
  this: Axios,
  params: getChannelInfo.Request
): ApiResponse<getChannelInfo.Response> {
  return this.post("/api/v1/channel/info", params);
}
