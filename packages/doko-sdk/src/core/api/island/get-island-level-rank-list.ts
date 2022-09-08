import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/** 获取群等级排行榜 */
export namespace getIslandLevelRankList {
  export interface Request {
    islandId: string;
  }
  export interface Response extends DokoResponse<RankData[]> {}

  export interface RankData {
    dodoId: string;
    nickName: string;
    level: number;
    rank: number;
  }
}

export function getIslandLevelRankList(
  this: Axios,
  params: getIslandLevelRankList.Request
): ApiResponse<getIslandLevelRankList.Response> {
  return this.post("/api/v1/island/level/rank/list", params);
}
