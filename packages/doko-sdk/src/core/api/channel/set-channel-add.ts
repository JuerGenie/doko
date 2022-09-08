import { ApiResponse, DokoResponse } from "../index.js";
import { Axios } from "axios";
import { ChannelModel, ChannelType } from "../../../index.js";

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
      channelId: ChannelModel["channelId"];
    }> {}
}

export function setChannelAdd(
  this: Axios,
  params: setChannelAdd.Request
): ApiResponse<setChannelAdd.Response> {
  return this.post("/api/v1/channel/add", params);
}
