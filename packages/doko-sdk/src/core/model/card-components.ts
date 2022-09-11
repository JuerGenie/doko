/** 标题 */
export interface CardMessageTitle {
  type: "header";
  text: {
    type: string;
    content: string;
  };
}

/** 文本 */
export interface CardMessageText {
  type: "section";
  text: {
    type: "plain-text" | "dodo-md";
    content: string;
  };
}

/** 多列文本 */
export interface CardMessageParagraph {
  type: "section";
  text: {
    type: "paragraph";
    cols: number;
    fields: CardMessageText["text"][];
  };
}

/** 文字+模块 */
export interface CardMessageSection {
  type: "section";
  align?: "left" | "right";
  text: (CardMessageText | CardMessageParagraph)["text"];
  accessory: CardMessageImage | CardMessageButton;
}

/** 备注 */
export interface CardMessageRemark {
  type: "remark";
  elements: Array<
    | CardMessageImage
    | {
        type: "plain-text" | "dodo-md";
        content: string;
      }
  >;
}

export interface CardMessageImage {
  type: "image";
  src: string;
}

export interface CardMessageImageGroup {
  type: "image-group";
  elements: CardMessageImage[];
}

export interface CardMessageVideo {
  type: "video";
  title?: string;
  cover: string;
  src: string;
}

export interface CardMessageCountdown {
  type: "countdown";
  title?: string;
  style: "day" | "hour";
  endTime: number;
}

export interface CardMessageDivider {
  type: "divider";
}

export interface CardMessageInput {
  type: "input";
  key: string;
  title: string;
  rows: number;
  placeholder?: string;
  minChar: number;
  maxChar: number;
}

export interface CardMessageForm {
  title: string;
  elements: CardMessageInput[];
}

export interface CardMessageButton {
  type: "button";
  interactCustomId?: string;
  click: {
    value?: string;
    action: "link_url" | "call_back" | "copy_content" | "form";
  };
  color: "grey" | "red" | "orange" | "green" | "blue" | "purple" | "default";
  name: string;
  form?: CardMessageForm;
}

export interface CardMessageButtonGroup {
  type: "button-group";
  elements: CardMessageButton[];
}

export interface CardMessageListSelector {
  type: "list-selector";
  interactCustomId?: string;
  placeholder?: string;
  elements: Array<{
    name: string;
    desc?: string;
  }>;
  min: number;
  max: number;
}

export type CardMessageComponent =
  | CardMessageButton
  | CardMessageButtonGroup
  | CardMessageCountdown
  | CardMessageDivider
  | CardMessageForm
  | CardMessageImage
  | CardMessageImageGroup
  | CardMessageInput
  | CardMessageListSelector
  | CardMessageParagraph
  | CardMessageRemark
  | CardMessageSection
  | CardMessageText
  | CardMessageTitle
  | CardMessageVideo;
