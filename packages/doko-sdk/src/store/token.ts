import { defineStore } from "pinia";

export const useToken = defineStore("doko-token", {
  state: () => ({
    token: "",
    clientId: "",
  }),
  getters: {
    header: (state) => `Bot ${state.clientId}.${state.token}`,
  },
});
