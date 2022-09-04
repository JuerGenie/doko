import { DodoEventType, Doko, MessageType } from "doko-sdk/index.js";
import { loadEnv } from "doko-sdk/utils/env.js";

loadEnv();

if (!process.env.CLIENT_ID || !process.env.TOKEN) {
  throw new Error("need env: CLIENT_ID, TOKEN");
}

const bot = new Doko(process.env.CLIENT_ID, process.env.TOKEN);

// 回声姬开关
let echo = false;
bot.event
  .on("doko.connected", () => {
    console.log("doko connected!");
  })
  .on("channel.message.text", (evt) => {
    console.log("receive message:", evt.data.eventBody);
    const { content } = evt.data.eventBody.messageBody;
    if (content === "rn") {
      bot.api.channel.setChannelMessageSend({
        channelId: evt.data.eventBody.channelId,
        messageType: MessageType.Text,
        messageBody: {
          content: Math.ceil(Math.random() * 100).toFixed(0),
        },
      });
    }
  })
  .on("channel.message.text", (data) => {
    const { content } = data.data.eventBody.messageBody;
    const matcher = content.match(/^echo (?<mode>on|off)$/);
    if (matcher) {
      echo = matcher.groups?.mode === "on";
      bot.api.channel.setChannelMessageSend({
        channelId: data.data.eventBody.channelId,
        messageType: MessageType.Text,
        messageBody: {
          content: `回声姬模式，${matcher.groups?.mode ?? "off"}！`,
        },
      });
      console.log();
    } else if (echo) {
      bot.api.channel.setChannelMessageSend({
        channelId: data.data.eventBody.channelId,
        messageType: data.data.eventBody.messageType,
        messageBody: data.data.eventBody.messageBody,
      });
    }
  });
await bot.start();
// console.log("hello world!");
