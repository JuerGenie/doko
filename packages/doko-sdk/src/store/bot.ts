import { BotModel } from "doko-sdk";
import { defineStore } from "pinia";

export const useBot = defineStore("bot", {
  state: () => ({} as BotModel),
  actions: {
    async refresh() {
      await this.getDoko().dodo.isReady;
      const res = await this.getDoko().dodo.bot().info();
      Object.assign(this, res);
    },
  },
});
