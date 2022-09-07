import { CardMessageComponent } from "./card-components.js";

export enum MessageType {
  Text = 1,
  Picture = 2,
  Video = 3,
  Share = 4,
  File = 5,
  Card = 6,
}

/** 文本消息 */
export interface TextMessage {
  messageType: MessageType.Text;
  messageBody: {
    content: string;
  };
}

/** 图片消息 */
export interface PictureMessage {
  messageType: MessageType.Picture;
  messageBody: {
    url: string;
    width: number;
    height: number;
    isOriginal: number;
  };
}

/** 视频消息 */
export interface VideoMessage {
  messageType: MessageType.Video;
  messageBody: {
    url: string;
    coverUrl: string;
    duration: number;
    size: number;
  };
}

/** 分享消息 */
export interface ShareMessage {
  messageType: MessageType.Share;
  messageBody: {
    jumpUrl: string;
  };
}

/** 文件消息 */
export interface FileMessage {
  messageType: MessageType.File;
  messageBody: {
    url: string;
    name: string;
    size: number;
  };
}

export enum CardMessageTheme {
  grey,
  red,
  orange,
  yellow,
  green,
  indigo,
  blue,
  purple,
  black,
  default,
}

/** 卡片消息 */
export interface CardMessage {
  messageType: MessageType.Card;
  messageBody: {
    content?: string;
    card: {
      type: "card";
      components: CardMessageComponent[];
      theme: CardMessageTheme;
      title?: string;
    };
  };
}

export type DokoMessage =
  | TextMessage
  | PictureMessage
  | VideoMessage
  | ShareMessage
  | FileMessage
  | CardMessage;
