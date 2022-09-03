import { DodoEventType, Doko, MessageType } from "doko-sdk/index.js";
import { loadEnv } from "doko-sdk/utils/env.js";

loadEnv();

const bot = new Doko(/** clientId */ "", /** token */ "");
console.log("create bot", bot);

// 回声姬开关
let echo = false;
bot.event
  .on("doko.connected", () => {
    console.log("doko connected!");
  })
  .on("channel.message", (evt) => {
    console.log("receive message:", evt.data.eventBody);
    if (evt.data.eventType === DodoEventType.ChannelMessage) {
      if (evt.data.eventBody.messageType === MessageType.Text) {
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
      }
    }
  })
  .on("channel.message.text", (data) => {
    const { content } = data.data.eventBody.messageBody;
    const matcher = content.match(/^echo (?<mode>on|off)$/);
    if (matcher) {
      echo = matcher.groups?.mode === "on";
      console.log(`回声姬模式，${matcher.groups?.mode ?? "off"}！`);
    } else {
      bot.api.channel.setChannelMessageSend({
        channelId: data.data.eventBody.channelId,
        messageType: data.data.eventBody.messageType,
        messageBody: {
          content: `${data.data.eventBody.messageBody}`,
        },
      });
    }
  });
await bot.start();
// console.log("hello world!");
