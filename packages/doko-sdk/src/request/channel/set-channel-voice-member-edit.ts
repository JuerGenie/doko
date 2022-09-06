import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 管理语音中的成员
 * @see https://open.imdodo.com/dev/api/channel-voice.html#%E7%AE%A1%E7%90%86%E8%AF%AD%E9%9F%B3%E4%B8%AD%E7%9A%84%E6%88%90%E5%91%98
 */
export namespace setChannelVoiceMemberEdit {
  export interface Request {
    channelId: string;
    dodoId: string;
    operateType: OperateType;
  }
  export interface Response extends DokoResponse<void> {}
}

export enum OperateType {
  /** 下麦 */
  Down = 0,
  /** 上麦 */
  Up = 1,
  /** 闭麦 */
  Close = 2,
  /** 移出频道 */
  Remove = 3,
}

export function setChannelVoiceMemberEdit(
  api: Axios,
  params: setChannelVoiceMemberEdit.Request
): ApiResponse<setChannelVoiceMemberEdit.Response> {
  return api.post("/api/v1/channel/voice/member/edit", params);
}
