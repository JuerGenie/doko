import { Awaitable, useIntervalFn } from "@vueuse/shared";
export interface AutoRefreshStore<T> {
  value: T;
  pause(): void;
  resume(): void;
}

export function useAutoRefreshStore<T>(
  factor: () => Awaitable<T>,
  interval: number
) {
  let value: T;
  const handler = useIntervalFn(
    async () => {
      value = await factor();
    },
    interval,
    { immediate: true }
  );

  return {
    get value() {
      return value;
    },
    pause() {
      handler.pause();
    },
    resume() {
      handler.resume();
    },
  };
}
