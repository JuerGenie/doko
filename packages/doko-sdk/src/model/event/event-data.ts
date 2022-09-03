import { RawChannelMessageButtonClickEvent } from "../../event/channel/message-button-click.js";
import { RawChannelMessageFormSubmitEvent } from "../../event/channel/message-form-submit.js";
import { RawChannelMessageReactionEvent } from "../../event/channel/message-reaction.js";
import { RawChannelMessageEvent } from "../../event/channel/message.js";
import { RawMemberJoinEvent } from "../../event/member/member-join.js";
import { RawMemberLeaveEvent } from "../../event/member/member-leave.js";
import { RawPersonalMessageEvent } from "../../event/personal/personal-message.js";

import { DodoEventType } from "./event-type.js";

export interface BusinessData<
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

export type DodoEventData<T extends DodoEventType = DodoEventType> = (
  | RawPersonalMessageEvent
  | RawMemberJoinEvent
  | RawMemberLeaveEvent
  | RawChannelMessageEvent
  | RawChannelMessageButtonClickEvent
  | RawChannelMessageFormSubmitEvent
  | RawChannelMessageReactionEvent
) & { eventType: T };
