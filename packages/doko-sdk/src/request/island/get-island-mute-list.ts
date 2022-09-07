import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/** 获取群禁言名单 */
export namespace getIslandMuteList {
  export interface Request {
    islandId: string;
    pageSize: number;
    maxId: number;
  }
  export interface Response
    extends DokoResponse<{
      maxId: number;
      list: {
        dodoId: string;
      }[];
    }> {}
}

export function getIslandMuteList(
  api: Axios,
  params: getIslandMuteList.Request
): ApiResponse<getIslandMuteList.Response> {
  return api.post("/api/v1/island/mute/list", params);
}
