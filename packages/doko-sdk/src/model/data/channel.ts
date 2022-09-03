export enum ChannelType {
  Text = 1,
  Voice = 2,
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
