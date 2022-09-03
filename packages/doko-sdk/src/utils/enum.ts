export function getEnumName<
  T extends Record<string, unknown> = Record<string, unknown>,
  K extends keyof T = keyof T
>(e: T, target: T[K]): K | undefined {
  for (const [name, value] of Object.entries(e)) {
    if (value === target) {
      return name as K;
    }
  }
}
