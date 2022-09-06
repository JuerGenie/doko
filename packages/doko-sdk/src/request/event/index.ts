import { defineApiSet } from "../define-set.js";
import { getWebSocketConnection } from "./get-websocket-connection.js";

export const EventApi = defineApiSet({
  getWebSocketConnection,
});
