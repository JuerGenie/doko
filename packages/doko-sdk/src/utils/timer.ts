export function delay<T extends unknown[]>(interval: number = 0, ...back: T) {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(back), interval);
  });
}
