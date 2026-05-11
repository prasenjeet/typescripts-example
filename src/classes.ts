// OOP patterns: inheritance, abstract classes, access modifiers

export abstract class Shape {
  constructor(protected color: string) {}

  abstract area(): number;
  abstract perimeter(): number;

  describe(): string {
    return `A ${this.color} shape with area ${this.area().toFixed(2)} and perimeter ${this.perimeter().toFixed(2)}`;
  }
}

export class Circle extends Shape {
  constructor(color: string, private radius: number) {
    super(color);
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

export class Rectangle extends Shape {
  constructor(color: string, private width: number, private height: number) {
    super(color);
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

export interface Serializable {
  serialize(): string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize(data: string): any;
}

export class JsonSerializer implements Serializable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize(data?: any): string {
    return JSON.stringify(data, null, 2);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize(data: string): any {
    return JSON.parse(data);
  }
}
