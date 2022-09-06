import Doko from "../index.js";
import axios from "axios";
import { factors } from "./interceptors/index.js";

import { AxiosResponse } from "axios";
import { StatusCode } from "./status.js";

import { EventApi } from "./event/index.js";
import { BotApi } from "./bot/index.js";
import { IslandApi } from "./island/index.js";
import { ChannelApi } from "./channel/index.js";
import { MemberApi } from "./member/index.js";
import { RoleApi } from "./role/index.js";

const { Axios } = axios;

export class Dodo extends Axios {
  constructor(private doko: Doko) {
    super({
      baseURL: "https://botopen.imdodo.com",
    });

    // 初始化中间件
    factors.forEach((factor) => {
      const { request, response } = factor(this.doko);

      if (request) {
        this.interceptors.request.use(request.onFulfilled, request.onRejected);
      }
      if (response) {
        this.interceptors.response.use(
          response.onFulfilled,
          response.onRejected
        );
      }
    });
  }

  bot = new BotApi(this);
  channel = new ChannelApi(this);
  event = new EventApi(this);
  island = new IslandApi(this);
  member = new MemberApi(this);
  role = new RoleApi(this);
}

export { insertFactor } from "./interceptors/index.js";
export { BotApi, ChannelApi, EventApi, IslandApi, MemberApi, RoleApi };

export interface DokoResponse<T = unknown> {
  status: StatusCode;
  message: string;
  data: T;
}

export type ApiResponse<T extends DokoResponse> = Promise<AxiosResponse<T>>;

export * from "./status.js";
