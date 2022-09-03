import type { ApiResponse, DokoResponse } from "../index.js";
import type { Island } from "../../model/data/island.js";
import type { Axios } from "axios";

/** 获取群信息 */
export namespace getIslandInfo {
  export interface Request {
    islandId: string;
  }
  export interface Response extends DokoResponse<Island> {}
}

export function getIslandInfo(
  api: Axios,
  params: getIslandInfo.Request
): ApiResponse<getIslandInfo.Response> {
  return api.post("/api/v1/island/info", params);
}
