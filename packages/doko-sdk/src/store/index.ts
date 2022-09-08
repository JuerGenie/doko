// import { useIslands } from "./island.js";
import { createPinia } from "pinia";
import { computed, reactive } from "@vue/reactivity";
import Doko from "../index.js";
import { useToken } from "./token.js";
import { useBot } from "./bot.js";

declare module "pinia" {
  interface PiniaCustomProperties {
    getDoko(): InstanceType<typeof Doko>;

    isReady: Promise<boolean>;
    intervalHandler: undefined | NodeJS.Timer;

    refresh(): Promise<void>;
    initialize(): this;
  }
}

export class DokoStore {
  private pinia = createPinia();

  constructor(private doko: Doko) {
    this.pinia.use(() => ({
      getDoko: () => doko,
      intervalHandler: undefined as undefined | NodeJS.Timer,
      isReady: Promise.resolve(false),

      initialize() {
        if (!this.intervalHandler && this.refresh) {
          this.isReady = this.refresh().then(() => true);
          this.intervalHandler = setInterval(() => {
            this.refresh!();
          }, doko.get("cacheInterval"));
        }
        return this as any;
      },
    }));
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
