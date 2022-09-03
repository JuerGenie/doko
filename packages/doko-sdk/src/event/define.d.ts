/// <reference path="./channel/index.d.ts" />
/// <reference path="./member/index.d.ts" />
/// <reference path="./personal/index.d.ts" />

interface DokoEventMap extends Record<string, (...args: any) => any> {}
