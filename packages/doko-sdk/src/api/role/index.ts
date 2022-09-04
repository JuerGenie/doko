import { defineApiSet } from "../define.js";
import { getRoleList } from "./get-role-list.js";
import { setRoleAdd } from "./set-role-add.js";
import { setRoleEdit } from "./set-role-edit.js";
import { setRoleMemberAdd } from "./set-role-member-add.js";
import { setRoleMemberRemove } from "./set-role-member-remove.js";
import { setRoleRemove } from "./set-role-remove.js";

export const RoleApi = defineApiSet({
  getRoleList,
  setRoleAdd,
  setRoleEdit,
  setRoleMemberAdd,
  setRoleMemberRemove,
  setRoleRemove,
});
