import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/**
 * 移动语音频道成员
 * @see https://open.imdodo.com/dev/api/channel-voice.html#%E7%A7%BB%E5%8A%A8%E8%AF%AD%E9%9F%B3%E9%A2%91%E9%81%93%E6%88%90%E5%91%98
 */
export namespace setChannelVoiceMemberMove {
  export interface Request {
    islandId: string;
    dodoId: string;
    channelId: string;
  }
  export interface Response extends DokoResponse<void> {}
}

export function setChannelVoiceMemberMove(
  api: Axios,
  params: setChannelVoiceMemberMove.Request
): ApiResponse<setChannelVoiceMemberMove.Response> {
  return api.post("/api/v1/channel/voice/member/move", params);
}
