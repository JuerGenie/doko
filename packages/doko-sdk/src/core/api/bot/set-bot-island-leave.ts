import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/** 获取WebSocket连接 */
export namespace setBotIslandLeave {
  export interface Request {
    islandId: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setBotIslandLeave(
  this: Axios,
  params: setBotIslandLeave.Request
): ApiResponse<setBotIslandLeave.Response> {
  return this.post("/api/v1/bot/island/leave", params);
}
