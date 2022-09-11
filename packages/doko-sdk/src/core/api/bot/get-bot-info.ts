import { BotModel } from "../../model/bot.js";
import { ApiResponse, DodoResponse } from "../index.js";
import { Axios } from "axios";

/** 获取机器人信息 */
export namespace getBotInfo {
  export interface Request {}
  export interface Response extends DodoResponse<BotModel> {}
}

export function getBotInfo(this: Axios): ApiResponse<getBotInfo.Response> {
  return this.post("/api/v1/bot/info");
}
