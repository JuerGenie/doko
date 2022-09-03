export enum MessageType {
  Text = 1,
  Picture = 2,
  Video = 3,
  Share = 4,
  File = 5,
  Card = 6,
}

export interface TextMessage {
  messageType: MessageType.Text;
  messageBody: {
    content: string;
  };
}

export interface PictureMessage {
  messageType: MessageType.Picture;
  messageBody: {
    url: string;
    width: number;
    height: number;
    isOriginal: number;
  };
}

export interface VideoMessage {
  messageType: MessageType.Video;
  messageBody: {
    url: string;
    coverUrl: string;
    duration: number;
    size: number;
  };
}

export interface ShareMessage {
  messageType: MessageType.Share;
  messageBody: {
    jumpUrl: string;
  };
}

export interface FileMessage {
  messageType: MessageType.File;
  messageBody: {
    url: string;
    name: string;
    size: number;
  };
}

export interface CardMessage {
  messageType: MessageType.Card;
}
