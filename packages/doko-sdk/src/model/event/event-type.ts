export enum DodoEventType {
  // ==== 文字频道事件 ====
  /** 消息事件 */
  ChannelMessage = "2001",
  /** 消息表情反馈事件 */
  ChannelMessageReaction = "3001",
  /** 卡片消息按钮事件 */
  ChannelCardButtonClick = "3002",
  /** 卡片消息表单回传事件 */
  ChannelCardFormSubmit = "3003",
  /** 卡片消息列表回传事件 */
  ChannelCardListSubmit = "3004",

  // ==== 成员事件 ====
  /** 成员加入 */
  MemberJoin = "4001",
  /** 成员退出 */
  MemberLeave = "4002",

  // ==== 私信事件 ====
  /** 私信事件 */
  PersonalMessage = "1001",
}
