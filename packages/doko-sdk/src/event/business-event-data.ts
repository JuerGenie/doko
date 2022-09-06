import { DodoEventType } from "./dodo-event-type.js";

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
