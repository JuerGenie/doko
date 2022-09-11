import {
  CardMessage,
  CardMessageTheme,
  Doko,
  HookHandler,
  HookParameter,
  MessageType,
  UsingHook,
} from "../src/index.js";
import { loadEnv } from "../src/utils/env.js";
import { ChannelMessageEvent } from "../src/core/event/channel/message.js";
import { genId } from "../src/utils/id.js";
import { RawChannelMessageButtonClickEvent } from "../src/core/event/channel/message-button-click.js";

loadEnv();

if (!process.env.CLIENT_ID || !process.env.TOKEN) {
  throw new Error("need env: CLIENT_ID, TOKEN");
}

const bot = new Doko({
  clientId: process.env.CLIENT_ID,
  token: process.env.TOKEN,
});

const iconMap = {
  "": "❓",
  jan: "✌️",
  ken: "✊",
  pon: "✋",
};

class Task {
  taskId = genId();
  private members;
  // 选择剪刀的成员
  private jan: string[] = [];
  // 选择拳头的成员
  private ken: string[] = [];
  // 选择布的成员
  private pon: string[] = [];
  private api;

  private __creator;
  get creator() {
    return this.__creator;
  }

  constructor(
    members: string[],
    private evt: ChannelMessageEvent<MessageType.Text>
  ) {
    this.api = bot.dodo
      .island()
      .with(evt.data.eventBody)
      .channel()
      .with(evt.data.eventBody)
      .message();
    this.__creator = evt.data.eventBody.dodoId;
    this.members = Object.fromEntries(
      members.map((member) => [member, "" as keyof typeof iconMap])
    );

    bot.hook.on("channel.card.button.click", this.eventHandler);

    this.createMessage();
  }

  destroy() {
    bot.hook.off("channel.card.button.click", this.eventHandler);
  }

  private eventHandler = function (
    this: Task,
    { data }: HookParameter<UsingHook["channel.card.button.click"]>
  ) {
    if (
      data.eventBody.interactCustomId === this.taskId &&
      data.eventBody.dodoId in this.members
    ) {
      this.processClick(data.eventBody);
    }
  }.bind(this);

  private async createMessage() {
    await this.api.send({
      messageType: MessageType.Card,
      messageBody: {
        content: Object.keys(this.members)
          .map((dodoId) => `<@!${dodoId}>`)
          .join(""),
        card: {
          type: "card",
          theme: CardMessageTheme.default,
          title: "Jan-Ken-Pon！",
          components: [
            {
              type: "button-group",
              elements: [
                {
                  type: "button",
                  interactCustomId: this.taskId,
                  click: { value: "jan", action: "call_back" },
                  color: "blue",
                  name: "✌️剪刀✌️",
                },
                {
                  type: "button",
                  interactCustomId: this.taskId,
                  click: { value: "ken", action: "call_back" },
                  color: "red",
                  name: "✊石头✊",
                },
                {
                  type: "button",
                  interactCustomId: this.taskId,
                  click: { value: "pon", action: "call_back" },
                  color: "orange",
                  name: "✋ 布 ✋",
                },
              ],
            },
          ],
        },
      },
    });
  }

  private async processClick({
    dodoId,
    value,
  }: RawChannelMessageButtonClickEvent["eventBody"]) {
    if (!this.members[dodoId]) {
      // 若未设置值，则为其设置值。
      this.members[dodoId] = value as keyof typeof iconMap;
      // 都已经选择了值了，则返回猜拳结果。
      if (!Object.values(this.members).find((val) => !val)) {
        this.createResult();
      }
    } else {
      this.api.send({
        messageType: MessageType.Text,
        messageBody: {
          content: `你已经选择过值了哦，你的选择是：${
            iconMap[this.members[dodoId]]
          }`,
        },
      });
    }
  }

  private async createResult() {
    const entries = Object.entries(this.members);
    const message = {
      messageType: MessageType.Card,
      messageBody: {
        card: {
          theme: CardMessageTheme.black,
          type: "card",
          components: [
            {
              type: "section",
              text: {
                type: "paragraph",
                cols: 6,
                fields: entries.map(([dodoId, value]) => ({
                  type: "dodo-md",
                  content: `<@!${dodoId}>：${
                    iconMap[value as keyof typeof iconMap]
                  }`,
                })),
              },
            },
          ],
        },
      },
    } as CardMessage;
    if (this.jan.length && this.ken.length && this.pon.length) {
      message.messageBody.card.components.push({
        type: "section",
        text: {
          type: "dodo-md",
          content: "喔哦——看起来是平局呢。",
        },
      });
    } else {
      let winner;
      if (!this.jan.length) {
        winner = this.pon;
      } else if (!this.ken.length) {
        winner = this.jan;
      } else {
        winner = this.ken;
      }

      message.messageBody.card.components.push({
        type: "section",
        text: {
          type: "dodo-md",
          content: `胜者是——${winner.map((id) => `<@!${id}>`).join("、")}！`,
        },
      });
    }
    this.api.send(message);
    this.destroy();
  }
}

bot.hook.on("channel.message.text", async (evt) => {
  const { data, at, response } = evt;

  const store = bot.store.useBot();
  const { content } = data.eventBody.messageBody;
  if (
    // at的第一个是机器人
    at.member[0] === store.dodoId &&
    // at之后跟着的是指令「猜拳」
    new RegExp(`^<@!${store.dodoId}>\s*猜拳[<\s]`).test(content) &&
    // 被at的其他人至少要有一个
    at.member.length > 1
  ) {
    new Task(at.member.slice(1), evt);
  }
});
