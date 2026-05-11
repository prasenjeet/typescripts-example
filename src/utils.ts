// Utility functions demonstrating TypeScript patterns

import type { ApiResponse } from "./types.js";

export function createApiResponse<T>(data: T, message = "OK"): ApiResponse<T> {
  return {
    data,
    success: true,
    message,
    timestamp: new Date(),
  };
}

export function groupBy<T, K extends keyof T>(items: T[], key: K): Map<T[K], T[]> {
  return items.reduce((acc, item) => {
    const groupKey = item[key];
    const group = acc.get(groupKey) ?? [];
    group.push(item);
    acc.set(groupKey, group);
    return acc;
  }, new Map<T[K], T[]>());
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function memoize<T extends (...args: unknown[]) => unknown>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key) as ReturnType<T>;
    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  }) as T;
}

export function formatCurrency(amount: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}
