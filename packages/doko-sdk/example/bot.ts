import { DodoEventType, Doko, MessageType } from "../src/index.js";

const bot = new Doko(/** clientId */ "", /** token */ "");
console.log("create bot", bot);
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
  });
await bot.start();
// console.log("hello world!");
