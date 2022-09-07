import { createPinia } from "pinia";
import { computed, reactive } from "@vue/reactivity";
import Doko from "../index.js";
import { useToken } from "./token.js";

declare module "pinia" {
  interface PiniaCustomProperties {
    doko: InstanceType<typeof Doko>;
    cacheInterval: number;
  }
}

export class DokoStore {
  private pinia = createPinia();

  constructor(private doko: Doko) {
    const cacheInterval = computed({
      get: () => doko.get("cacheInterval"),
      set: (val) => doko.set("cacheInterval", val),
    });
    const dokoGetter = computed(() => this.doko);
    this.pinia.use(() =>
      reactive({
        cacheInterval,
        dokoGetter,
      })
    );
  }

  useToken() {
    return useToken(this.pinia);
  }
}
