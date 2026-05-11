// Core types and interfaces used across the project

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export enum Role {
  Admin = "admin",
  Editor = "editor",
  Viewer = "viewer",
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export type UserSummary = Pick<User, "id" | "name" | "email">;

export type PartialProduct = Partial<Product>;

export type ReadonlyUser = Readonly<User>;

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
  timestamp: Date;
};
