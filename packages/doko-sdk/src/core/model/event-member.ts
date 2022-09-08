import { MemberModel } from "./member.js";

export interface EventMemberModel
  extends Pick<MemberModel, "nickName" | "joinTime"> {}
