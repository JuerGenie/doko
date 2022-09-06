import { RawChannelMessageButtonClickEvent } from "../event/channel/message-button-click.js";
import { RawChannelMessageFormSubmitEvent } from "../event/channel/message-form-submit.js";
import { RawChannelMessageReactionEvent } from "../event/channel/message-reaction.js";
import { RawChannelMessageEvent } from "../event/channel/message.js";
import { RawIslandMemberJoinEvent } from "../event/member/member-join.js";
import { RawIslandMemberLeaveEvent } from "../event/member/member-leave.js";
import { RawPersonalMessageEvent } from "../event/personal/personal-message.js";
import { RawChannelVoiceMemberJoinEvent } from "../event/voice/channel-voice-member-join.js";
import { RawChannelVoiceMemberLeaveEvent } from "../event/voice/channel-voice-member-leave.js";
import { RawChannelArticleEvent } from "../event/article/channel-article.js";
import { RawChannelArticleCommentEvent } from "../event/article/channel-article-comment.js";
import { DodoEventType } from "../event/dodo-event-type.js";

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
