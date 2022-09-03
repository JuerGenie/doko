import { defineApiSet } from "../define.js";
import { getChannelList } from "./get-channel-list.js";
import { setChannelMessageSend } from "./set-channel-message-send.js";

export const ChannelApi = defineApiSet({
  getChannelList,
  setChannelMessageSend,
});
