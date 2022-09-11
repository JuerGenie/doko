# doko-sdk

## 1.4.0

### Minor Changes

- 更新 API 命名，优化 store 初始化逻辑，添加 logger 工具，新增示例「jan-ken-pon」。

### Patch Changes

- 移除 cjs 输出，只支持 esm 格式构建输出。

## 1.3.1

### Patch Changes

- 修改身份组实例 API 的参数声明，pick `roleId` only.

## 1.3.0

### Minor Changes

- 封装底层请求接口，调整接口注册方式。对事件进行增强，提供快捷回复函数。

## 1.2.0

### Minor Changes

- 将 DokoEvent 迁移至 DokoHook，提供 hook 机制，以及更好的类型提示。

### Patch Changes

- 修改 DokoEvent 的类型声明，用以解决 dts 类型声明文件构建问题。

## 1.1.0

### Minor Changes

- d472324: 项目文件结构调整，更新 0.1.4 接口及事件。

### Patch Changes

- 修改 exports 配置及相关引用路径。

## 1.0.3

### Patch Changes

- 补充频道 API、文字频道 API、身份组 API、成员 API 声明。

## 1.0.2

### Patch Changes

- 更新 bot 示例，更新.gitignore 列表。

## 1.0.1

### Patch Changes

- 1095d7c: 创建仓库，提交初版 SDK 代码。
