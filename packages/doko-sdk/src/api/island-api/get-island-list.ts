import type { ApiResponse, DokoResponse } from "../index.js";
import type { Island } from "../../model/data/island.js";
import type { Axios } from "axios";

/** 获取群列表 */
export namespace getIslandList {
  export interface Request {}
  export interface Response extends DokoResponse<Island[]> {}
}

export function getIslandList(api: Axios): ApiResponse<getIslandList.Response> {
  return api.post("/api/v1/island/list");
}
