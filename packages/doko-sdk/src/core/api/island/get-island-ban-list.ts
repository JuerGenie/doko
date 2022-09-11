import type { ApiResponse, DodoResponse } from "../index.js";
import type { Axios } from "axios";

/** 获取群封禁名单 */
export namespace getIslandBanList {
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

export function getIslandBanList(
  this: Axios,
  params: getIslandBanList.Request
): ApiResponse<getIslandBanList.Response> {
  return this.post("/api/v1/island/ban/list", params);
}
