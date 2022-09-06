import { Dodo } from "./request/index.js";
import { DokoStore } from "./store/index.js";
import { DokoEvent } from "./event/index.js";

import { loadEnv } from "./utils/env.js";

loadEnv();

export interface DokoOptions {
  clientId: string;
  token: string;

  cacheInterval?: number;
}

export class Doko {
  /** doko 状态数据 */
  store = new DokoStore(this);
  /** doko api 对象 */
  /** doko 事件对象 */
  event = new DokoEvent(this);
  /** dodo 底层 api 对象 */
  dodo = new Dodo(this);

  constructor(private options: DokoOptions) {
    const { clientId, token } = options;
    options.cacheInterval ??= 60 * 1000;

    const tokenStore = this.store.useToken();
    tokenStore.token = token;
    tokenStore.clientId = clientId;
  }

  /** 尝试连接到dodo，并开始处理事件 */
  start() {
    return this.event.start();
  }

  get<K extends keyof DokoOptions>(key: K) {
    return this.options[key]!;
  }
}

export default Doko;
export * from "./request/index.js";
export * as request from "./request/index.js";
export * from "./model/index.js";
export * as model from "./model/index.js";
export * from "./event/index.js";
export * as event from "./event/index.js";
