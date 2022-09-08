import { Doko, MessageType } from "../src/index.js";
import { loadEnv } from "../src/utils/env.js";

loadEnv();

if (!process.env.CLIENT_ID || !process.env.TOKEN) {
  throw new Error("need env: CLIENT_ID, TOKEN");
}

// 创建机器人实例
const bot = new Doko({
  clientId: process.env.CLIENT_ID,
  token: process.env.TOKEN,
});

// 回声姬开关
let echo = false;

// 监听连接事件，由Doko发出，所有Doko事件存放于`doko.*`命名空间之下。
bot.hook.on("doko.connected", () => {
  console.log("doko connected!");
});
// 监听特定类型（文本类型）的消息事件
bot.hook.on("channel.message.text", (data) => {
  const { content } = data.data.eventBody.messageBody;

  const matcher = content.match(/^echo (?<mode>on|off)$/); // 如果输入的文本是特定指令，做处理
  if (matcher) {
    echo = matcher.groups?.mode === "on";
    data.response({
      messageType: MessageType.Text,
      messageBody: {
        content: `回声姬模式，${matcher.groups?.mode ?? "off"}！`,
      },
    });
  } else if (echo) {
    // 若开关被打开，复读每条文本消息√
    data.response(
      {
        messageType: data.data.eventBody.messageType,
        messageBody: data.data.eventBody.messageBody,
      },
      {
        reply: true,
      }
    );
  }
});
await bot.start();
