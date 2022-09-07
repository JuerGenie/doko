import Doko from "../index.js";
import { DodoEventData } from "./dodo-event-data.js";
import { DodoEventType } from "./dodo-event-type.js";

export abstract class EventProcessor<
  T extends DodoEventType = DodoEventType,
  D extends DodoEventData<T> = DodoEventData<T>
> {
  abstract eventType: T;
  /**
   * @param event 等待处理的事件对象
   * @return 处理完毕的事件对象，如果返回空值，或未返回数据，则表示该事件不再继续做处理
   */
  abstract process(event: D): Awaitable<D | void>;
}

type EventProcessorFactor<T extends DodoEventType> = (
  doko: Doko
) => Awaitable<EventProcessor<T>>;
export function defineEventProcessor<
  T extends DodoEventType,
  F extends EventProcessorFactor<T> = EventProcessorFactor<T>
>(factor: F) {
  return factor;
}
