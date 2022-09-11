import { DodoEventType } from "./dodo-event-type.js";
import { DodoEventData } from "./dodo-event-data.js";
import { DodoDataType } from "./dodo-event.js";
import Doko, { CustomHook, PresetHook } from "../../index.js";
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
import { getLogger } from "../../utils/logger.js";

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

export type UsingHook = PresetHook & CustomHook;
export type PresetHookType = keyof PresetHook;
export type CustomHookType = keyof CustomHook;
export type UsingHookType = PresetHookType | CustomHookType;
export type HookParameter<T extends EventHook> = T extends EventHook<infer R>
  ? R
  : never;
export type HookHandler<T extends UsingHookType> = (
  payload: HookParameter<UsingHook[T]>
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

const logger = getLogger("DokoHook");

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
    return this;
  }

  async initializeProcessors() {
    logger.info(`初始化事件处理器 (${handlers.length})`);
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
            logger.info(
              [
                "加载事件处理器：",
                Object.entries(DodoEventType).find(
                  ([_, v]) => v === processor.eventType
                )?.[0] ?? "unknown",
              ].join("")
            );
          }
        } catch (e) {
          logger.error(`failed to load processor: ${handler}`, e);
        }
      })
    );
  }

  /** 创建dodo事件通知流 */
  async start() {
    await this.initializePromise;
    logger.info("获取事件推流地址...");
    const res = await this.doko.dodo.event().url();
    this.ws = new client({});
    this.ws
      .on("connect", (connection) => {
        logger.info("已连接至事件推流地址！");
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
                logger.debug("接收数据：", message.binaryData.toString());
                if (data.type !== 1) {
                  this.processEvent(data.data);
                }
              } catch (e) {
                logger.error("解析消息异常：", message.binaryData.toString());
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
        logger.error("cannot open connection:", err);
      });
    this.ws.connect(res.data.data.endpoint);
    logger.info("正在连接至事件推流服务...");
  }

  async processEvent(event: DodoEventData<DodoEventType>) {
    logger.debug(
      "process event: ",
      [
        event.eventType,
        `(${(this.processorMap.get(event.eventType) ?? []).length})`,
      ].join("")
    );
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

  on<A extends Array<UsingHookType>>(
    hook: A,
    callback: A extends Array<infer R>
      ? R extends UsingHookType
        ? HookHandler<R>
        : never
      : never
  ): this;
  on<T extends UsingHookType>(
    hook: T,
    callback: typeof hook extends T ? HookHandler<T> : never
  ): this;
  on<T extends UsingHookType, A extends Array<UsingHookType>>(
    hook: T | A,
    callback: typeof hook extends T
      ? HookHandler<T>
      : A extends Array<infer R>
      ? R extends UsingHookType
        ? HookHandler<R>
        : never
      : never
  ): this {
    if (!Array.isArray(hook)) {
      hook = [hook] as A;
    }
    hook.forEach((e) => {
      this.getHook(e as PresetHookType).on(callback as any);
    });
    return this;
  }

  off<T extends UsingHookType>(hook: T, callback: HookHandler<T>): this;
  off<T extends Array<UsingHookType>>(
    hook: T,
    callback: T extends Array<infer R>
      ? R extends UsingHookType
        ? HookHandler<R>
        : never
      : never
  ): this;
  off<T extends UsingHookType, A extends Array<UsingHookType>>(
    hook: T | A,
    callback: typeof hook extends T
      ? HookHandler<T>
      : A extends Array<infer R>
      ? R extends UsingHookType
        ? HookHandler<R>
        : never
      : never
  ) {
    if (!Array.isArray(hook)) {
      hook = [hook] as A;
    }
    hook.forEach((e) => {
      this.getHook(e as PresetHookType).off(callback as any);
    });
    return this;
  }

  trigger<T extends UsingHookType>(
    hook: T,
    payload: Parameters<HookHandler<T>>[0]
  ): this;
  trigger<A extends Array<UsingHookType>>(
    hook: A,
    payload: Parameters<
      A extends Array<infer R>
        ? R extends UsingHookType
          ? HookHandler<R>
          : never
        : never
    >[0]
  ): this;
  trigger<T extends UsingHookType, A extends Array<UsingHookType>>(
    hook: T | A,
    payload: Parameters<
      typeof hook extends T
        ? HookHandler<T>
        : A extends Array<infer R>
        ? R extends UsingHookType
          ? HookHandler<R>
          : never
        : never
    >[0]
  ) {
    if (!Array.isArray(hook)) {
      hook = [hook] as A;
    }
    hook.forEach((e) => {
      this.getHook(e as PresetHookType).trigger(payload as any);
    });
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
