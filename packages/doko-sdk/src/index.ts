/// <reference path="./patch.d.ts" />
import { DodoApi } from "./core/api/index.js";
import { DokoStore } from "./store/index.js";
import { DokoHook } from "./core/event/index.js";

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
  /** doko 事件对象 */
  hook = new DokoHook(this);
  /** 经过抽象的 dodo api 对象 */
  dodo = new DodoApi(this);

  constructor(private options: DokoOptions) {
    const { clientId, token } = options;
    options.cacheInterval ??= 60 * 1000;

    const tokenStore = this.store.useToken();
    tokenStore.token = token;
    tokenStore.clientId = clientId;
  }

  /** 尝试连接到dodo，并开始处理事件 */
  start() {
    return this.hook.start();
  }

  get<K extends keyof DokoOptions>(key: K) {
    return this.options[key]!;
  }
  set<K extends keyof DokoOptions>(key: K, value: DokoOptions[K]) {
    this.options[key] = value;
  }
}

export default Doko;
export * from "./core/api/index.js";
export * from "./core/model/index.js";
export * from "./core/event/index.js";

export interface CustomHook {}
export interface PresetHook {}
