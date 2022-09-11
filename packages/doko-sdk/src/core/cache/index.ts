export type CacheKey<T = unknown> = string;

export class DokoCache {
  private cache = {} as Record<
    CacheKey,
    {
      value: unknown;
      handler: NodeJS.Timer;
    }
  >;

  async registerCache<K extends CacheKey<T>, T extends unknown>(
    key: K,
    factorOrValue: T | (() => Awaitable<T>)
  ) {
    if (!this.cache[key]) {
      if (typeof factorOrValue === "function") {
        const factor = factorOrValue as () => Awaitable<T>;

        this.cache[key] = {
          value: await factor(),
          handler: setInterval(async () => {
            this.cache[key].value = await factor();
          }, 60 * 1000),
        };
      }
    }
  }

  getCache<K extends CacheKey<T>, T>(key: K) {
    return this.cache[key].value as T | undefined;
  }
}
