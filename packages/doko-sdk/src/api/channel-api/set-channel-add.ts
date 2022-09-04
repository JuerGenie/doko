import type { ApiResponse, DokoResponse } from "doko-sdk/api/index.js";
import type { Axios } from "axios";
import type { Channel, ChannelType } from "doko-sdk";

/**
 * 创建频道
 * 用于在指定群下创建指定频道。
 * 按DoDo群限制，10次/30秒。
 * @see https://open.imdodo.com/dev/api/channel.html#%E8%8E%B7%E5%8F%96%E9%A2%91%E9%81%93%E4%BF%A1%E6%81%AF
 */
export namespace setChannelAdd {
  export interface Request {
    islandId: string;
    /** 未设置则使用 `新的频道` */
    channelName?: string;
    /** 频道类型 */
    channelType: ChannelType;
  }
  export interface Response
    extends DokoResponse<{
      channelId: Channel["channelId"];
    }> {}
}

export function setChannelAdd(
  api: Axios,
  params: setChannelAdd.Request
): ApiResponse<setChannelAdd.Response> {
  return api.post("/api/v1/channel/add", params);
}
