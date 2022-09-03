import type { ApiInterceptorFactor } from "./define.js";
import json from "./json.js";
import token from "./token.js";

export const factors = [token, json];
export default factors;

export function insertFactor(factor: ApiInterceptorFactor) {
  factors.push(factor);
}
