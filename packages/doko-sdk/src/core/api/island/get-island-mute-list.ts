import type { ApiResponse, DodoResponse } from "../index.js";
import type { Axios } from "axios";

/** 获取群禁言名单 */
export namespace getIslandMuteList {
  export interface Request {
    islandId: string;
    pageSize: number;
    maxId: number;
  }
  export interface Response
    extends DodoResponse<{
      maxId: number;
      list: {
        dodoId: string;
      }[];
    }> {}
}

export function getIslandMuteList(
  this: Axios,
  params: getIslandMuteList.Request
): ApiResponse<getIslandMuteList.Response> {
  return this.post("/api/v1/island/mute/list", params);
}
