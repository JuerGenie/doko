import { DodoEventType, Doko, MessageType } from "doko-sdk";
import { loadEnv } from "doko-sdk/utils/env.js";

loadEnv();

if (!process.env.CLIENT_ID || !process.env.TOKEN) {
  throw new Error("need env: CLIENT_ID, TOKEN");
}

// 创建机器人实例
const bot = new Doko(process.env.CLIENT_ID, process.env.TOKEN);

// 回声姬开关
let echo = false;

bot.event
  .on("doko.connected", () => {
    // 监听连接事件，由Doko发出，所有Doko事件存放于`doko.*`命名空间之下。
    console.log("doko connected!");
  })
  .on("channel.message.*", (evt) => {
    // 监听所有消息事件
    console.log("receive message:", evt.data.eventBody);
    if (evt.data.eventType === DodoEventType.ChannelMessageReaction) {
      // 若事件是消息表情反馈事件，做一些处理
      console.log("消息被标记了！");
    }
  })
  .on("channel.message.text", (data) => {
    // 监听特定类型（文本类型）的消息事件
    const { content } = data.data.eventBody.messageBody;

    const matcher = content.match(/^echo (?<mode>on|off)$/); // 如果输入的文本是特定指令，做处理
    if (matcher) {
      echo = matcher.groups?.mode === "on";
      bot.api.channel.setChannelMessageSend({
        channelId: data.data.eventBody.channelId,
        messageType: MessageType.Text,
        messageBody: {
          content: `回声姬模式，${matcher.groups?.mode ?? "off"}！`,
        },
      });
    } else if (echo) {
      // 若开关被打开，复读每条文本消息√
      bot.api.channel.setChannelMessageSend({
        channelId: data.data.eventBody.channelId,
        messageType: data.data.eventBody.messageType,
        messageBody: data.data.eventBody.messageBody,
      });
    }
  });
await bot.start();
