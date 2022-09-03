import { defineStore } from "pinia";
import { computed, ref } from "@vue/reactivity";

export const useToken = defineStore("doko-token", () => {
  const token = ref("");
  const clientId = ref("");

  const header = computed(() => `Bot ${clientId.value}.${token.value}`);

  return {
    token,
    clientId,

    header,
  };
});
