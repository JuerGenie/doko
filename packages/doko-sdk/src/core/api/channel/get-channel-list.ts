import { ApiResponse, DodoResponse } from "../index.js";
import { ChannelModel } from "../../../index.js";
import { Axios } from "axios";

/**  */
export namespace getChannelList {
  export interface Request {
    islandId: string;
  }
  export interface Response extends DodoResponse<ChannelModel[]> {}
}

export function getChannelList(
  this: Axios,
  params: getChannelList.Request
): ApiResponse<getChannelList.Response> {
  return this.post("/api/v1/channel/list", params);
}
