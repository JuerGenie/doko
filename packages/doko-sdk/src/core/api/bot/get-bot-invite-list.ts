import { MemberModel } from "../../model/member.js";
import type { ApiResponse, DodoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 获取机器人邀请列表
 * @see https://open.imdodo.com/dev/api/bot.html#%E8%8E%B7%E5%8F%96%E6%9C%BA%E5%99%A8%E4%BA%BA%E9%82%80%E8%AF%B7%E5%88%97%E8%A1%A8
 */
export namespace getBotInviteList {
  export interface Request {
    pageSize: number;
    maxId: number;
  }
  export interface Response
    extends DodoResponse<{
      maxId: number;
      list: Pick<MemberModel, "dodoId" | "nickName" | "avatarUrl">[];
    }> {}
}

export function getBotInviteList(
  this: Axios,
  params: getBotInviteList.Request
): ApiResponse<getBotInviteList.Response> {
  return this.post("/api/v1/bot/invite/list", params);
}
