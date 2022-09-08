import type { ApiResponse, DokoResponse } from "../index.js";
import type { Axios } from "axios";

/** 获取WebSocket连接 */
export namespace getWebSocketConnection {
  export interface Request {}
  export interface Response
    extends DokoResponse<{
      endpoint: string;
    }> {}
}

export function getWebSocketConnection(
  this: Axios
): ApiResponse<getWebSocketConnection.Response> {
  return this.post("/api/v1/websocket/connection");
}
