import { RawChannelMessageButtonClickEvent } from "doko-sdk/event/channel/message-button-click.js";
import { RawChannelMessageFormSubmitEvent } from "doko-sdk/event/channel/message-form-submit.js";
import { RawChannelMessageReactionEvent } from "doko-sdk/event/channel/message-reaction.js";
import { RawChannelMessageEvent } from "doko-sdk/event/channel/message.js";
import { RawIslandMemberJoinEvent } from "doko-sdk/event/member/member-join.js";
import { RawIslandMemberLeaveEvent } from "doko-sdk/event/member/member-leave.js";
import { RawPersonalMessageEvent } from "doko-sdk/event/personal/personal-message.js";
import { RawChannelVoiceMemberJoinEvent } from "doko-sdk/event/voice/channel-voice-member-join.js";
import { RawChannelVoiceMemberLeaveEvent } from "doko-sdk/event/voice/channel-voice-member-leave.js";
import { RawChannelArticleEvent } from "doko-sdk/event/article/channel-article.js";
import { RawChannelArticleCommentEvent } from "doko-sdk/event/article/channel-article-comment.js";
import { DodoEventType } from "doko-sdk/event/dodo-event-type.js";

export type DodoEventData<T extends DodoEventType = DodoEventType> = (
  | RawPersonalMessageEvent
  | RawIslandMemberJoinEvent
  | RawIslandMemberLeaveEvent
  | RawChannelMessageEvent
  | RawChannelMessageButtonClickEvent
  | RawChannelMessageFormSubmitEvent
  | RawChannelMessageReactionEvent
  | RawChannelVoiceMemberJoinEvent
  | RawChannelVoiceMemberLeaveEvent
  | RawChannelArticleEvent
  | RawChannelArticleCommentEvent
) & { eventType: T };
