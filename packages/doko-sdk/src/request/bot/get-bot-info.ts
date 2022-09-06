import { BotModel } from "doko-sdk/model/bot.js";
import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/** 获取WebSocket连接 */
export namespace getBotInfo {
  export interface Request {}
  export interface Response extends DokoResponse<BotModel> {}
}

export function getBotInfo(api: Axios): ApiResponse<getBotInfo.Response> {
  return api.post("/api/v1/bot/info");
}
