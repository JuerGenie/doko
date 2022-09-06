import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";
import type { SwitchStatus } from "../../model/switch-status.js";
import type { MicSortStatus } from "../../model/mic-sort-status.js";

/**
 * 获取成员语音频道状态
 * @see https://open.imdodo.com/dev/api/channel-voice.html#%E8%8E%B7%E5%8F%96%E6%88%90%E5%91%98%E8%AF%AD%E9%9F%B3%E9%A2%91%E9%81%93%E7%8A%B6%E6%80%81
 */
export namespace getChannelVoiceMemberStatus {
  export interface Request {
    islandId: string;
    dodoId: string;
  }
  export interface Response
    extends DokoResponse<{
      /** 所在语音频道ID */
      channelId: string;
      spkStatus: SwitchStatus;
      micStatus: SwitchStatus;
      micSortStatus: MicSortStatus;
    }> {}
}

export function getChannelVoiceMemberStatus(
  api: Axios,
  params: getChannelVoiceMemberStatus.Request
): ApiResponse<getChannelVoiceMemberStatus.Response> {
  return api.post("/api/v1/channel/voice/member/status", params);
}
