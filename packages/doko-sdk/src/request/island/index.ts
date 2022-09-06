import { defineApiSet } from "../define-set.js";
import { getIslandBanList } from "./get-island-ban-list.js";
import { getIslandInfo } from "./get-island-info.js";
import { getIslandLevelRankList } from "./get-island-level-rank-list.js";
import { getIslandList } from "./get-island-list.js";
import { getIslandMuteList } from "./get-island-mute-list.js";

export const IslandApi = defineApiSet({
  getIslandBanList,
  getIslandInfo,
  getIslandLevelRankList,
  getIslandList,
  getIslandMuteList,
});
