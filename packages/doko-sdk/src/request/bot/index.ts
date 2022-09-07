import { defineApiSet } from "../define-set.js";
import { getBotInfo } from "./get-bot-info.js";
import { getBotInviteList } from "./get-bot-invite-list.js";
import { setBotInviteRemove } from "./set-bot-invite-remove.js";
import { setBotIslandLeave } from "./set-bot-island-leave.js";

export const BotApi = defineApiSet({
  getBotInfo,
  getBotInviteList,
  setBotIslandLeave,
  setBotInviteRemove,
});
