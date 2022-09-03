import { AxiosResponse } from "axios";
import { StatusCode } from "../model/api/status.js";

export interface DokoResponse<T = unknown> {
  status: StatusCode;
  message: string;
  data: T;
}

export type ApiResponse<T extends DokoResponse> = Promise<AxiosResponse<T>>;

export { EventApi } from "./event-api/index.js";
export { BotApi } from "./bot-api/index.js";
export { IslandApi } from "./island-api/index.js";
export { ChannelApi } from "./channel-api/index.js";
