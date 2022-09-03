import { defineApiSet } from "../define.js";
import { getWebSocketConnection } from "./get-websocket-connection.js";

export const EventApi = defineApiSet({
  getWebSocketConnection,
});
