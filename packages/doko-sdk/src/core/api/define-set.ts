// import { Dodo } from "./index.js";

// export function defineApiSet<
//   APIs extends Record<string, (api: Dodo, ...args: any[]) => any>
// >(apis: APIs) {
//   return class {
//     [key: string]: (...args: any[]) => any;

//     constructor(API: Dodo) {
//       Object.entries(apis).forEach(([api, act]) => {
//         this[api] = (...args: unknown[]) => act(API, ...args);
//       });
//     }
//   } as new (api: Dodo) => {
//     [key in keyof APIs]: APIs[key] extends (
//       api: Dodo,
//       ...args: infer ARG
//     ) => infer R
//       ? (...args: ARG) => R
//       : never;
//   };
// }
