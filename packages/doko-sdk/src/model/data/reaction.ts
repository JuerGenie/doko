import { Emoji } from "./emoji.js";

export enum ReactionType {
  Remove = 0,
  Add = 1,
}

export interface ReactionTarget {
  type: 0;
  /** messageId */
  id: string;
}
export interface ReactionEmoji {
  type: 1;
  /** emojiId */
  id: Emoji;
}
