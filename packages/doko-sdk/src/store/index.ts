import { createPinia } from "pinia";
import Doko from "../index.js";
import { useToken } from "./token.js";

export class DokoStore {
  private pinia = createPinia();

  constructor(private doko: Doko) {}

  useToken() {
    return useToken(this.pinia);
  }
}
