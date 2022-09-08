import { RawChannelMessageEvent } from "../event/channel/message.js";
import Doko, {
  ChannelModel,
  ChannelType,
  Emoji,
  IslandModel,
  MemberModel,
  RoleModel,
} from "../../index.js";
import axios from "axios";
import { factors } from "./interceptors/index.js";

import { AxiosResponse } from "axios";
import { StatusCode } from "./status.js";

import * as eventApi from "./event/index.js";
import * as botApi from "./bot/index.js";
import * as islandApi from "./island/index.js";
import * as channelApi from "./channel/index.js";
import * as memberApi from "./member/index.js";
import * as roleApi from "./role/index.js";

import _ from "lodash";

const { Axios } = axios;

export class DodoApi extends Axios {
  constructor(private doko: Doko) {
    super({
      baseURL: "https://botopen.imdodo.com",
    });

    // 初始化中间件
    factors.forEach((factor) => {
      const { request, response } = factor(this.doko);

      if (request) {
        this.interceptors.request.use(request.onFulfilled, request.onRejected);
      }
      if (response) {
        this.interceptors.response.use(
          response.onFulfilled,
          response.onRejected
        );
      }
    });
  }

  /** 机器人API */
  bot = () =>
    ({
      /** 获取机器人信息 */
      info: botApi.getBotInfo.bind(this),
      /** 邀请列表API */
      invite: () => ({
        list: botApi.getBotInviteList.bind(this),
        add: botApi.setBotInviteAdd.bind(this),
        remove: botApi.setBotInviteRemove.bind(this),
      }),
      /** 群组API */
      island: ({ islandId }: Pick<IslandModel, "islandId">) => ({
        leave: () => botApi.setBotIslandLeave.bind(this)({ islandId }),
      }),
    } as const);
  /** 事件API */
  event = () => ({
    url: eventApi.getWebSocketConnection.bind(this),
  });
  /** 群组列表API */
  island = () => ({
    list: islandApi.getIslandList.bind(this),

    /** 群组实例API */
    with: ({ islandId }: Pick<IslandModel, "islandId">) => ({
      info: islandApi.getIslandInfo.bind(this, { islandId }),

      /** 群组成员列表API */
      member: () => ({
        list: (pageSize: number, maxId: number) =>
          memberApi.getMemberList.call(this, { islandId, pageSize, maxId }),
        levelRank: islandApi.getIslandLevelRankList.bind(this, { islandId }),
        ban: (pageSize: number, maxId: number) =>
          islandApi.getIslandBanList.call(this, { islandId, pageSize, maxId }),
        mute: (pageSize: number, maxId: number) =>
          islandApi.getIslandMuteList.call(this, { islandId, pageSize, maxId }),

        /** 群组成员实例API */
        with: ({ dodoId }: Pick<MemberModel, "dodoId">) => ({
          info: memberApi.getMemberInfo.bind(this, { islandId, dodoId }),
          role: () => ({
            list: () =>
              memberApi.getMemberRoleList.bind(this, { islandId, dodoId }),
          }),
          invite: () => ({
            list: () =>
              memberApi.getMemberInvitationInfo.bind(this, {
                islandId,
                dodoId,
              }),
          }),
          nickName: () => ({
            edit: (nickName: string) =>
              memberApi.setMemberNickNameEdit.call(this, {
                islandId,
                dodoId,
                nickName,
              }),
          }),

          mute: ({
            duration,
            reason,
          }: Pick<memberApi.setMemberMuteAdd.Request, "duration" | "reason">) =>
            memberApi.setMemberMuteAdd.call(this, {
              islandId,
              dodoId,
              duration,
              reason,
            }),
          unmute: memberApi.setMemberMuteRemove.bind(this, {
            islandId,
            dodoId,
          }),

          ban: ({
            noticeChannelId,
            reason,
          }: Pick<
            memberApi.setMemberBanAdd.Request,
            "noticeChannelId" | "reason"
          >) =>
            memberApi.setMemberBanAdd.call(this, {
              islandId,
              dodoId,
              noticeChannelId,
              reason,
            }),
          unban: memberApi.setMemberBanRemove.bind(this, { islandId, dodoId }),

          /** 语音频道API */
          voice: () => ({
            status: channelApi.getChannelVoiceMemberStatus.bind(this, {
              islandId,
              dodoId,
            }),
            move: ({
              channelId,
            }: Pick<
              ChannelModel & { channelType: ChannelType.Voice },
              "channelId"
            >) =>
              channelApi.setChannelVoiceMemberMove.call(this, {
                islandId,
                dodoId,
                channelId,
              }),
            operate: ({
              operateType,
              channelId,
            }: Pick<
              channelApi.setChannelVoiceMemberEdit.Request,
              "operateType" | "channelId"
            >) =>
              channelApi.setChannelVoiceMemberEdit.call(this, {
                channelId,
                dodoId,
                operateType,
              }),
          }),
        }),
      }),

      /** 频道列表API */
      channel: () =>
        ({
          list: channelApi.getChannelList.bind(this, { islandId }),
          add: channelApi.setChannelAdd.bind(this),

          /** 频道实例API */
          with: ({ channelId }: Pick<ChannelModel, "channelId">) => ({
            info: () => ({
              get: () => channelApi.getChannelInfo.bind(this, { channelId }),
            }),
            remove: channelApi.setChannelRemove.bind(this, {
              islandId,
              channelId,
            }),
            edit: (channelName?: string) =>
              channelApi.setChannelEdit.call(this, {
                islandId,
                channelId,
                channelName,
              }),

            /** 文本频道API */
            message: () => ({
              send: (
                params: Omit<
                  channelApi.setChannelMessageSend.Request,
                  "channelId"
                >
              ) =>
                channelApi.setChannelMessageSend.call(this, {
                  ...(params as any),
                  channelId,
                }),

              /** 文本频道消息实例API */
              with: <
                T extends Pick<
                  RawChannelMessageEvent["eventBody"],
                  "messageId" | "messageBody" | "messageType"
                >
              >({
                messageId,
                messageBody,
              }: T) => ({
                edit: () =>
                  channelApi.setChannelMessageEdit.call(this, {
                    messageId,
                    messageBody,
                  }),
                withdraw: (reason?: string) =>
                  channelApi.setChannelMessageWithdraw.bind(this, {
                    messageId,
                    reason,
                  }),
                reaction: () => ({
                  add: (emoji: Emoji) =>
                    channelApi.setChannelMessageReactionAdd.call(this, {
                      messageId,
                      emoji,
                    }),
                  remove: (emoji: Emoji, dodoId?: string) =>
                    channelApi.setChannelMessageReactionRemove.call(this, {
                      messageId,
                      emoji,
                      dodoId,
                    }),
                }),
              }),
            }),

            /** 语音频道API */
            voice: () => ({
              member: () => ({
                add: ({ dodoId }: Pick<MemberModel, "dodoId">) =>
                  channelApi.setChannelVoiceMemberMove.call(this, {
                    islandId,
                    channelId,
                    dodoId,
                  }),
                operate: ({
                  dodoId,
                  operateType,
                }: Pick<
                  channelApi.setChannelVoiceMemberEdit.Request,
                  "dodoId" | "operateType"
                >) =>
                  channelApi.setChannelVoiceMemberEdit.call(this, {
                    channelId,
                    dodoId,
                    operateType,
                  }),
              }),
            }),

            /** 帖子频道API */
            article: () => ({
              add: (
                params: Omit<
                  channelApi.setChannelArticleAdd.Request,
                  "channelId"
                >
              ) =>
                channelApi.setChannelArticleAdd.call(this, {
                  ...params,
                  channelId,
                }),
              remove: (
                params: Omit<
                  channelApi.setChannelArticleRemove.Request,
                  "channelId"
                >
              ) =>
                channelApi.setChannelArticleRemove.call(this, {
                  ...params,
                  channelId,
                }),
            }),
          }),
        } as const),

      /** 身份组API */
      role: () => ({
        list: () => roleApi.getRoleList.bind(this, { islandId }),
        add: (params: Omit<roleApi.setRoleAdd.Request, "islandId">) =>
          roleApi.setRoleAdd.call(this, {
            ...params,
            islandId,
          }),

        /** 身份组实例API */
        with: ({ roleId }: RoleModel) => ({
          edit: (
            params: Omit<roleApi.setRoleEdit.Request, "islandId" | "roleId">
          ) =>
            roleApi.setRoleEdit.call(this, {
              ...params,
              roleId,
              islandId,
            }),

          remove: () => roleApi.setRoleRemove.bind(this, { islandId, roleId }),

          /** 成员身份组操作API */
          member: () => ({
            add: ({ dodoId }: Pick<MemberModel, "dodoId">) =>
              roleApi.setRoleMemberAdd.call(this, {
                islandId,
                roleId,
                dodoId,
              }),
            remove: ({ dodoId }: Pick<MemberModel, "dodoId">) =>
              roleApi.setRoleMemberRemove.call(this, {
                islandId,
                roleId,
                dodoId,
              }),
          }),
        }),
      }),
    }),
  });
}

export { insertFactor } from "./interceptors/index.js";

export interface DokoResponse<T = unknown> {
  status: StatusCode;
  message: string;
  data: T;
}

export type ApiResponse<T extends DokoResponse> = Promise<AxiosResponse<T>>;

export * from "./status.js";
