/// <reference path="./patch.d.ts" />
import { DodoApi } from "./core/api/index.js";
import { DokoHook } from "./core/event/index.js";
import { DokoCache } from "./core/cache/index.js";
import { DokoStore } from "./store/index.js";
import { loadEnv } from "./utils/env.js";
import { getLogger } from "./utils/logger.js";

loadEnv();

export interface DokoOptions {
  clientId: string;
  token: string;

  cacheInterval?: number;
}

export class Doko {
  private logger = getLogger("Doko");

  /** doko 状态数据 */
  store: DokoStore;
  /** 经过抽象的 dodo api 对象 */
  dodo: DodoApi;
  /** doko 事件对象 */
  hook: DokoHook;

  cache: DokoCache;

  constructor(private options: DokoOptions) {
    // const { clientId, token } = options;
    options.cacheInterval ??= 60 * 1000;

    this.logger.info("创建Doko实例——");

    this.logger.info("正在创建全局状态...");
    this.store = new DokoStore(this);
    this.logger.info("正在创建API实例...");
    this.dodo = new DodoApi(this);
    this.logger.info("正在创建hook实例...");
    this.hook = new DokoHook(this);
    this.logger.info("正在创建缓存状态...");
    this.cache = new DokoCache();

    this.logger.info("Doko实例已创建！");
  }

  /** 尝试连接到dodo，并开始处理事件 */
  async start() {
    this.logger.info("正在等待API实例准备完毕...");
    await this.dodo.isReady;
    this.logger.info("API实例已准备完毕！");
    this.logger.info("正在启动hook实例...");
    await this.hook.start();
  }

  get<K extends keyof DokoOptions>(key: K) {
    this.logger.debug(`get(${key}) -> ${this.options[key]}`);
    return this.options[key]!;
  }
  set<K extends keyof DokoOptions>(key: K, value: DokoOptions[K]) {
    this.logger.debug(`set(${key}) -> ${value}`);
    this.options[key] = value;
  }
}

export default Doko;
export * from "./core/api/index.js";
export * from "./core/model/index.js";
export * from "./core/event/index.js";

export interface CustomHook {}
export interface PresetHook {}
