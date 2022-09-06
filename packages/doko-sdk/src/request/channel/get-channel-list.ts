import type { ApiResponse, DokoResponse } from "../index.js";
import type { ChannelModel } from "../../index.js";
import type { Axios } from "axios";

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
