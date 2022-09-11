import { ApiResponse, DodoResponse } from "../index.js";
import { IslandModel } from "../../model/island.js";
import { Axios } from "axios";

/**
 * 获取群列表
 * @see https://open.imdodo.com/dev/api/island.html#%E8%8E%B7%E5%8F%96%E7%BE%A4%E5%88%97%E8%A1%A8
 */
export namespace getIslandList {
  export interface Request {}
  export interface Response extends DodoResponse<IslandModel[]> {}
}

export function getIslandList(
  this: Axios
): ApiResponse<getIslandList.Response> {
  return this.post("/api/v1/island/list");
}
