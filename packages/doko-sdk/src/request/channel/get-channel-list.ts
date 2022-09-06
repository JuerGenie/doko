import { ApiResponse, DokoResponse } from "../index.js";
import { ChannelModel } from "../../index.js";
import { Axios } from "axios";

/**  */
export namespace getChannelList {
  export interface Request {
    islandId: string;
  }
  export interface Response extends DokoResponse<ChannelModel[]> {}
}

export function getChannelList(
  api: Axios,
  params: getChannelList.Request
): ApiResponse<getChannelList.Response> {
  return api.post("/api/v1/channel/list", params);
}
