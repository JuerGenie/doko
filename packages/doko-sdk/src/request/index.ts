import Doko from "../index.js";
import axios from "axios";
import { factors } from "./interceptors/index.js";

import { EventApi, BotApi, IslandApi, ChannelApi } from "../api/index.js";

const { Axios } = axios;

export class DokoApi extends Axios {
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
}

export { insertFactor } from "./interceptors/index.js";
