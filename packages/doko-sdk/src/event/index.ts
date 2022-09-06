import * as eventemitter2 from "eventemitter2";
import { DodoEventType } from "doko-sdk/event/dodo-event-type.js";
import Doko from "../index.js";
import { Awaitable } from "@vueuse/core";
import { DodoEventData } from "./dodo-event-data.js";
import websocket from "websocket";
import { DodoEvent } from "./dodo-event.js";
import { EventProcessor } from "./define.js";

const { EventEmitter2 } = eventemitter2.default;
const { client, connection } = websocket;

const handlers = [
  import("./channel/message.js"),
  import("./channel/message-button-click.js"),
  import("./channel/message-form-submit.js"),
  import("./channel/message-list-submit.js"),
  import("./channel/message-reaction.js"),
  import("./member/member-join.js"),
  import("./member/member-leave.js"),
  import("./personal/personal-message.js"),
];

type EventType = keyof DokoEventMap;

export class DokoEvent extends EventEmitter2 {
  private initializePromise: Promise<void>;
  private processorMap = new Map<
    DodoEventType,
    EventProcessor<DodoEventType>[]
  >();

  private ws?: InstanceType<typeof client>;
  private connection?: InstanceType<typeof connection>;

  constructor(private doko: Doko) {
    super({
      wildcard: true,
      delimiter: ".",
    });
    this.initializePromise = this.initializeProcessors();
  }

  async initializeProcessors() {
    await Promise.all(
      handlers.map(async (handler) => {
        try {
          const mod = await handler;
          if (typeof mod.default === "function") {
            const processor = (await mod.default(
              this.doko
            )) as EventProcessor<DodoEventType>;
            if (!this.processorMap.has(processor.eventType)) {
              this.processorMap.set(processor.eventType, []);
            }
            this.processorMap.get(processor.eventType)?.push(processor);
          }
        } catch (e) {
          console.error(`failed to load processor: ${handler}`, e);
        }
      })
    );
  }

  whenReady(callback?: () => Awaitable<void>) {
    return this.initializePromise.then(callback);
  }

  /** 创建dodo事件通知流 */
  async start() {
    await this.whenReady();
    const res = await this.doko.dodo.event.getWebSocketConnection();
    this.ws = new client({});
    this.ws
      .on("connect", (connection) => {
        this.connection = connection;
        this.emit("doko.connected", this.connection);

        // 开始维持心跳，虽然说是30秒一次，为了避免网络波动导致的断连，此处设置为25秒。
        const heartbeatHandler = setInterval(() => {
          this.connection?.ping("heart beat.");
        }, 25 * 1000);

        this.connection
          .on("message", (message) => {
            if (message.type === "binary") {
              try {
                const data = JSON.parse(
                  message.binaryData.toString()
                ) as DodoEvent;
                if (data.type !== 1) {
                  this.processEvent(data.data);
                }
              } catch (e) {
                console.error("解析消息异常：", message.binaryData.toString());
              }
            }
          })
          .on("close", (code, desc) => {
            clearTimeout(heartbeatHandler);
            this.emit("doko.disconnected", { code, desc });
          })
          .on("error", (err) => {
            clearTimeout(heartbeatHandler);
            this.emit("doko.error", err);
          });
      })
      .on("connectFailed", (err) => {
        console.error("cannot open connection:", err);
      });
    this.ws.connect(res.data.data.endpoint);
  }

  async processEvent(event: DodoEventData<DodoEventType>) {
    for (const processor of this.processorMap.get(event.eventType) ?? []) {
      const res = await processor.process(event);
      if (!res) {
        return;
      }
    }
  }

  on: <K extends EventType>(event: K, listener: DokoEventMap[K]) => this = super
    .on as any;
  once: <K extends EventType>(event: K, listener: DokoEventMap[K]) => this =
    super.once as any;
  off: <K extends EventType>(event: K, listener: DokoEventMap[K]) => this =
    super.off as any;

  addListener: <K extends EventType>(
    event: K,
    listener: DokoEventMap[K]
  ) => this = super.addListener as any;

  removeListener: <K extends EventType>(
    event: K,
    listener: DokoEventMap[K]
  ) => this = super.removeListener as any;

  removeAllListeners: <K extends EventType>(event: K) => this = super
    .removeAllListeners as any;

  emit: <K extends EventType>(
    event: K,
    ...payload: Parameters<DokoEventMap[K]>
  ) => boolean = super.emit as any;
  emitAsync: <K extends EventType>(
    event: K,
    ...payload: Parameters<DokoEventMap[K]>
  ) => Promise<any[]> = super.emitAsync as any;
}

declare global {
  interface DokoEventMap {
    "doko.error": (err: Error) => Awaitable<void>;
    "doko.connected": (
      conn: InstanceType<typeof connection>
    ) => Awaitable<void>;
    "doko.disconnected": (info: {
      code: number;
      desc: string;
    }) => Awaitable<void>;
  }
}

export { DodoEventType } from "./dodo-event-type.js";
export { BusinessEventData } from "./business-event-data.js";
export { DodoEvent } from "./dodo-event.js";
export { DodoEventData } from "./dodo-event-data.js";
