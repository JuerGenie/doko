import { IslandModel } from "./island.js";

export enum Sex {
  Keep = -1,
  Female = 0,
  Male = 1,
}

export enum IsBot {
  No = 0,
  Yes = 1,
}
export enum OnlineDevice {
  None = 0,
  PC = 1,
  Phone = 2,
}
export enum OnlineStatus {
  Offline = 0,
  Online = 1,
  DontDisturb = 2,
  AFK = 3,
}

export interface MemberModel {
  islandId: IslandModel["islandId"];
  dodoId: string;
  nickName: string;
  personalNickName: string;
  avatarUrl: string;
  joinTime: string;
  sex: Sex;
  level: number;
  isBot: IsBot;
  onlineDevice: OnlineDevice;
  onlineStatus: OnlineStatus;
}
