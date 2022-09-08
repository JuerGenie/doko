import { MemberModel } from "../../model/member.js";
import { ApiResponse, DokoResponse } from "../index.js";
import { Axios } from "axios";

/**
 * 获取成员列表
 * @see https://open.imdodo.com/dev/api/role.html#%E5%8F%96%E6%B6%88%E6%88%90%E5%91%98%E8%BA%AB%E4%BB%BD%E7%BB%84
 */
export namespace getMemberList {
  export interface Request {
    islandId: string;
    pageSize: number;
    maxId: number;
  }
  export interface Response
    extends DokoResponse<{
      maxId: number;
      list: MemberModel[];
    }> {}
}

export function getMemberList(
  this: Axios,
  params: getMemberList.Request
): ApiResponse<getMemberList.Response> {
  return this.post("/api/v1/member/list", params);
}
