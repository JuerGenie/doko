import { defineApiSet } from "../define-set.js";
import { getBotInfo } from "./get-bot-info.js";
import { setBotIslandLeave } from "./set-bot-island-leave.js";

export const BotApi = defineApiSet({
  getBotInfo,
  setBotIslandLeave,
});
