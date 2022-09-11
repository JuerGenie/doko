// import { useIslands } from "./island.js";
import { createPinia, Pinia } from "pinia";
import { computed, reactive } from "@vue/reactivity";
import Doko from "../index.js";
import { useToken } from "./token.js";
import { useBot } from "./bot.js";
import { getLogger } from "../utils/logger.js";

declare module "pinia" {
  interface PiniaCustomProperties {
    getDoko(): InstanceType<typeof Doko>;

    isReady: Promise<boolean>;
    intervalHandler: undefined | NodeJS.Timer;

    refresh(): Promise<void>;
    initialize(): this;
  }
}

const logger = getLogger("DokoStore");

export class DokoStore {
  private pinia: Pinia;

  constructor(doko: Doko) {
    this.pinia = createPinia();

    this.pinia.use((ctx) => {
      ctx.store.getDoko = () => doko;
      ctx.store.intervalHandler = undefined as undefined | NodeJS.Timer;
      ctx.store.isReady = Promise.resolve(false);

      ctx.store.initialize = function () {
        logger.log(`初始化store：${ctx.store.$id}`);
        if (!ctx.store.intervalHandler && !!ctx.store.refresh) {
          ctx.store.intervalHandler = setInterval(() => {
            logger.debug(`刷新store：${ctx.store.$id}`);
            ctx.store.refresh!();
          }, doko.get("cacheInterval") ?? 60 * 1000);
          ctx.store.isReady = ctx.store.refresh().then(() => true);
        }
        return this as any;
      };
    });
    this.pinia.install({
      provide() {},
      config: {
        globalProperties: {},
      },
    } as any);
  }

  useToken() {
    return useToken(this.pinia);
  }

  // useIslandStore() {
  //   return useIslands(this.pinia).initialize();
  // }

  useBot() {
    return useBot(this.pinia).initialize();
  }
}
