import { defineApiSet } from "../define-set.js";
import { getMemberInfo } from "./get-member-info.js";
import { getMemberInvitationInfo } from "./get-member-invitation-info.js";
import { getMemberList } from "./get-member-list.js";
import { getMemberRoleList } from "./get-member-role-list.js";
import { setMemberBanAdd } from "./set-member-ban-add.js";
import { setMemberBanRemove } from "./set-member-ban-remove.js";
import { setMemberMuteAdd } from "./set-member-mute-add.js";
import { setMemberMuteRemove } from "./set-member-mute-remove.js";
import { setMemberNickNameEdit } from "./set-member-nick-name-edit.js";

export const MemberApi = defineApiSet({
  getMemberInfo,
  getMemberInvitationInfo,
  getMemberList,
  getMemberRoleList,
  setMemberBanAdd,
  setMemberBanRemove,
  setMemberMuteAdd,
  setMemberMuteRemove,
  setMemberNickNameEdit,
});
