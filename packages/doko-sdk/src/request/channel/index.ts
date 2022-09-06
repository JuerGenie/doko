import { defineApiSet } from "../define-set.js";
import { getChannelInfo } from "./get-channel-info.js";
import { getChannelList } from "./get-channel-list.js";
import { getChannelVoiceMemberStatus } from "./get-channel-voice-member-status.js";
import { setChannelAdd } from "./set-channel-add.js";
import { setChannelEdit } from "./set-channel-edit.js";
import { setChannelMessageEdit } from "./set-channel-message-edit.js";
import { setChannelMessageReactionAdd } from "./set-channel-message-reaction-add.js";
import { setChannelMessageReactionRemove } from "./set-channel-message-reaction-remove.js";
import { setChannelMessageSend } from "./set-channel-message-send.js";
import { setChannelMessageWithdraw } from "./set-channel-message-withdraw.js";
import { setChannelRemove } from "./set-channel-remove.js";
import { setChannelVoiceMemberMove } from "./set-channel-voice-member-move.js";

export const ChannelApi = defineApiSet({
  getChannelInfo,
  getChannelList,
  getChannelVoiceMemberStatus,
  setChannelAdd,
  setChannelEdit,
  setChannelMessageEdit,
  setChannelMessageReactionAdd,
  setChannelMessageReactionRemove,
  setChannelMessageSend,
  setChannelMessageWithdraw,
  setChannelRemove,
  setChannelVoiceMemberMove,
});
