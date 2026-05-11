// Demonstrates generic functions, classes, and constraints

export function identity<T>(value: T): T {
  return value;
}

export function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

export function filterBy<T, K extends keyof T>(items: T[], key: K, value: T[K]): T[] {
  return items.filter((item) => item[key] === value);
}

export class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export class Repository<T extends { id: number }> {
  private store: Map<number, T> = new Map();

  add(item: T): void {
    this.store.set(item.id, item);
  }

  findById(id: number): T | undefined {
    return this.store.get(id);
  }

  findAll(): T[] {
    return Array.from(this.store.values());
  }

  remove(id: number): boolean {
    return this.store.delete(id);
  }

  get count(): number {
    return this.store.size;
  }
}
