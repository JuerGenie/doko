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
  /** 成员加入群组 */
  IslandMemberJoin = "4001",
  /** 成员退出群组 */
  IslandMemberLeave = "4002",

  // ==== 语音频道事件 ====
  /** 成员加入语音频道 */
  ChannelVoiceMemberJoin = "5001",
  /** 成员离开语音频道 */
  ChannelVoiceMemberLeave = "5002",

  // ==== 帖子频道事件 ====
  /** 帖子发布事件 */
  ChannelArticleEvent = "6001",
  /** 帖子回复事件 */
  ChannelArticleCommentEvent = "6002",

  // ==== 私信事件 ====
  /** 私信事件 */
  PersonalMessage = "1001",
}
