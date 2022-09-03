import { DokoApi } from "../request/index.js";

export function defineApiSet<
  APIs extends Record<string, (api: DokoApi, ...args: any[]) => any>
>(apis: APIs) {
  return class {
    [key: string]: (...args: any[]) => any;

    constructor(API: DokoApi) {
      Object.entries(apis).forEach(([api, act]) => {
        this[api] = (...args: unknown[]) => act(API, ...args);
      });
    }
  } as new (api: DokoApi) => {
    [key in keyof APIs]: APIs[key] extends (
      api: DokoApi,
      ...args: infer ARG
    ) => infer R
      ? (...args: ARG) => R
      : never;
  };
}
