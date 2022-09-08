import { MemberModel, Sex } from "./member.js";

export interface EventPersonalModel
  extends Pick<MemberModel, "nickName" | "avatarUrl" | "sex"> {}
