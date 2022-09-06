import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/** 获取群封禁名单 */
export namespace getIslandBanList {
  export interface Request {
    islandId: string;
    pageSize: number;
    maxId: number;
  }
  export interface Response extends DokoResponse<{ dodoId: string }[]> {}
}

export function getIslandBanList(
  api: Axios,
  params: getIslandBanList.Request
): ApiResponse<getIslandBanList.Response> {
  return api.post("/api/v1/island/ban/list", params);
}
