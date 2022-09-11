## Doko - NodeJS SDK for [Dodo](https://www.imdodo.com/)

> ⚡️Low-level, Easy and Simple.

v.1.3.1 (2022/09/08)

1. 使用Typescript开发，能提供详尽的类型提示（大概，我尽量）
2. 代码简单，开发快速，易于使用
3. 拥有基于NPM的丰富生态，可快捷实现各种功能（只要善于搜索）
4. 基于ESNext规范（一切按标准来）
5. 因为4，所以虽然不确定能不能用，不过Deno和Bun.js也许可以试试
   1. 听说Deno要有大动作了，总之先期待一下
   2. Bun.js真的很快！

## 📖 食用姿势

### 对使用者（机器人开发者）而言

1. 创建一个项目
2. 执行
   ```bash
   # npm:
   npm install doko-sdk
   # yarn:
   yarn doko-sdk
   # pnpm:
   pnpm add doko-sdk
   ```
3. 创建 `index.js`
4. 引入 `import { Doko } from "doko-sdk"`，并创建一个实例
5. 监听任何你想监听的事件，做你任何想做的事情
6. 调用 `Doko.start()` 启动机器人

你可以参考项目下的 [example](./packages/doko-sdk/example/bot.ts)，一切从 `new Doko()` 开始，使用 `Doko.hook` 添加事件钩子，使用 `Doko.dodo` 调用API。

一切准备完毕后，使用 `Doko.start()` 让机器人开始它的旅程。

![SDK使用范例](https://img.imdodo.com/dodo/6ddd9432183ef0986122823bab82aed4.png)
![范例运行效果](https://img.imdodo.com/dodo/c12125da0db6c1a39c26f1d1eab0b2bb.png)

## 📝 Todo List 

> 因为是自用SDK，所以实现优先级会以我自己的实际需求为准。不过如果有需要的话，也可以提issues，我会做参考的。

- [🚧] 添加完整的API列表
  - [✅] 机器人API
  - [✅] 群API
  - [✅] 频道API
  - [✅] 文字频道API
  - [✅] 帖子频道API
  - [✅] 语音频道API
  - [✅] 身份组API
  - [✅] 成员API
  - [⌛️] 数字藏品API
  - [⌛️] 私信API
  - [⌛️] 资源API
  - [✅] 事件API
- [✅] 添加完整的事件监听
  - [✅] 创建websocket链接
  - [✅] 监听群组成员Event
  - [✅] 监听文字频道Event
  - [✅] 监听帖子频道Event
  - [✅] 监听语音频道Event
  - [✅] 监听私信Event
- [⌛️] 添加健壮性特性
  - [⌛️] 断线重连尝试
- [🚧] 添加快捷使用方式
  - [✅] 消息事件快捷回复
  - [⌛️] JSX/TSX to CardMessage
  - [🚧] 代码式创建MessageBody
- [✅] API便捷性封装
  - [✅] 机器人API
  - [✅] 群API
  - [✅] 频道API
  - [✅] 文字频道API
  - [✅] 帖子频道API
  - [✅] 身份组API
  - [✅] 成员API
- [⌛️] Guide Documents
- [🚧] 更多特性待添加...

> ⌛️：待完成\
> 🚧：施工中\
> ✅：已完成

---

你可以在这里看到关于包的最新状态：[npm: doko-sdk](https://www.npmjs.com/package/doko-sdk)。

如果有时间的话，我会逐步完善贡献指引（如果真的有贡献者的话）。

## 🗓 更新记录

[在此处查看完整的更新日志](https://github.com/JuerGenie/doko/blob/main/packages/doko-sdk/CHANGELOG.md)

---

## 😠 一点牢骚

> 啊——虽然在一个礼拜前就收到邮件然后打算做了，但是直到周末才有一点儿时间开始动手来着。
>
> 在此之前经历了平均一天面对电脑15小时的30日地狱……
>
> 不过总算是开始做了，虽然只是一个很简陋的雏形，只能提供基本的事件接收和频道消息发送。我想着先这样吧，凑合着用一用。然后想到也许社区中会有人用得到，于是就这么发出来了，万一遇到志同道合者一起合作也是好事。
>
> 说到typescript，开发过程中想到了不知道在哪看过的一句话：「使用typescript的库开发者有一半时间在和类型系统掐架」，感觉确实是这样呢（笑）。
>
> ——By JuerGenie，2022/09/04

嘛，一切随缘（x）