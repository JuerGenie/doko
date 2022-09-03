import { DokoApi } from "./request/index.js";
import { DokoStore } from "./store/index.js";
import { DokoEvent } from "./event/index.js";

import { loadEnv } from "./utils/env.js";

loadEnv();

export class Doko {
  /** doko 状态数据 */
  store = new DokoStore(this);
  /** doko api 对象 */
  api = new DokoApi(this);
  /** doko 事件对象 */
  event = new DokoEvent(this);

  constructor(clientId: string, token: string) {
    const tokenStore = this.store.useToken();
    tokenStore.token = token;
    tokenStore.clientId = clientId;
  }

  /** 尝试连接到dodo，并开始处理事件 */
  start() {
    return this.event.start();
  }
}

export default Doko;
export * from "./model/api/index.js";
export * from "./model/data/index.js";
export * from "./model/event/index.js";
