export enum ChannelType {
  /** 文字频道 */
  Text = 1,
  /** 语音频道 */
  Voice = 2,
  /** 帖子频道 */
  Forum = 4,
  Link = 5,
  Material = 6,
}

export enum DefaultFlag {
  No = 0,
  Yes = 1,
}

export interface Channel {
  channelId: string;
  channelName: string;
  channelType: ChannelType;
  defaultFlag: DefaultFlag;
  groupId: string;
  groupName: string;
}
