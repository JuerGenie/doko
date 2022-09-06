import { DodoEventType } from "./dodo-event-type.js";
import { DodoEventData } from "./dodo-event-data.js";
import { DodoDataType } from "./dodo-event.js";
import Doko, { CustomHook, PresetHook } from "../index.js";
import websocket from "websocket";
import { DodoEvent } from "./dodo-event.js";
import { EventProcessor } from "./define.js";
import { Awaitable, createEventHook, EventHook } from "@vueuse/shared";

import channelArticleComment from "./article/channel-article-comment.js";
import channelArticle from "./article/channel-article.js";
import messageButtonClick from "./channel/message-button-click.js";
import messageFormSubmit from "./channel/message-form-submit.js";
import messageListSubmit from "./channel/message-list-submit.js";
import messageReaction from "./channel/message-reaction.js";
import message from "./channel/message.js";
import memberJoin from "./member/member-join.js";
import memberLeave from "./member/member-leave.js";
import personalMessage from "./personal/personal-message.js";
import channelVoiceMemberJoin from "./voice/channel-voice-member-join.js";
import channelVoiceMemberLeave from "./voice/channel-voice-member-leave.js";

const { client, connection } = websocket;

const handlers = [
  channelArticleComment,
  channelArticle,
  messageButtonClick,
  messageFormSubmit,
  messageListSubmit,
  messageReaction,
  message,
  memberJoin,
  memberLeave,
  personalMessage,
  channelVoiceMemberJoin,
  channelVoiceMemberLeave,
];

export type PresetHookType = keyof PresetHook;
export type CustomHookType = keyof CustomHook;
export type HookParameter<T extends EventHook> = T extends EventHook<infer R>
  ? R
  : never;
export type HookHandler<T extends PresetHookType | CustomHookType> = (
  payload: HookParameter<(PresetHook & CustomHook)[T]>
) => void;

declare module "doko-sdk" {
  interface PresetHook {
    "doko.error": EventHook<Error>;
    "doko.connected": EventHook<InstanceType<typeof connection>>;
    "doko.disconnected": EventHook<{
      code: number;
      desc: string;
    }>;
  }
}

export class DokoHook {
  private initializePromise: Promise<void>;
  private processorMap = new Map<
    DodoEventType,
    EventProcessor<DodoEventType>[]
  >();

  private presetHooks: PresetHook = {
    "doko.connected": createEventHook<InstanceType<typeof connection>>(),
    "doko.disconnected": createEventHook<{
      code: number;
      desc: string;
    }>(),
    "doko.error": createEventHook<Error>(),
  };
  private customHooks: CustomHook = {} as CustomHook;

  private ws?: InstanceType<typeof client>;
  private connection?: InstanceType<typeof connection>;

  constructor(private doko: Doko) {
    this.initializePromise = this.initializeProcessors();
  }

  async initializeProcessors() {
    await Promise.all(
      handlers.map(async (handler) => {
        try {
          if (typeof handler === "function") {
            const processor = (await handler(
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
        this.getHook("doko.connected").trigger(this.connection);

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
            this.getHook("doko.disconnected").trigger({ code, desc });
          })
          .on("error", (err) => {
            clearTimeout(heartbeatHandler);
            this.getHook("doko.error").trigger(err);
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

  getHook<T extends PresetHookType>(hook: T): PresetHook[T];
  getHook<T extends CustomHookType>(hook: T): CustomHook[T];
  getHook<T extends string>(hook: T) {
    return hook in this.presetHooks
      ? this.presetHooks[hook as PresetHookType]
      : (this.customHooks[hook as CustomHookType] ??= createEventHook<any>());
  }

  on<T extends Array<PresetHookType | CustomHookType>>(
    ...hook: [
      ...T,
      T extends Array<infer R>
        ? R extends PresetHookType | CustomHookType
          ? HookHandler<R>
          : never
        : never
    ]
  ) {
    if (hook.length >= 2 && typeof hook.at(-1) === "function") {
      hook.slice(0, -1).forEach((e) => {
        this.getHook(e as PresetHookType).on(hook.at(-1) as any);
      });
    }
    return this;
  }
  off<T extends Array<PresetHookType | CustomHookType>>(
    ...hook: [
      ...T,
      T extends Array<infer R>
        ? R extends PresetHookType | CustomHookType
          ? HookHandler<R>
          : never
        : never
    ]
  ) {
    if (hook.length >= 2 && typeof hook.at(-1) === "function") {
      hook.slice(0, -1).forEach((e) => {
        this.getHook(e as PresetHookType).off(hook.at(-1) as any);
      });
    }
    return this;
  }
}

export interface BusinessEventData<
  D extends DodoEventType = DodoEventType,
  B = unknown
> {
  /** 事件ID */
  eventId: string;
  /** 事件类型 */
  eventType: D;
  /** 事件数据 */
  eventBody: B;
  /** 时间戳 */
  timestamp: number;
}

export { DodoEventType, DodoDataType };
