import { Emoji } from "./emoji.js";

export enum ReactionType {
  Remove = 0,
  Add = 1,
}

export interface ReactionTargetModel {
  type: 0;
  /** messageId */
  id: string;
}
export interface ReactionEmojiModel {
  type: 1;
  /** emojiId */
  id: Emoji;
}
