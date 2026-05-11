import { Role, type User, type Product } from "./types.js";
import { Stack, Repository, filterBy, identity, getFirst } from "./generics.js";
import { Circle, Rectangle, JsonSerializer } from "./classes.js";
import { createApiResponse, groupBy, formatCurrency, memoize } from "./utils.js";

// --- Types & Interfaces ---
const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", role: Role.Admin, createdAt: new Date("2024-01-01") },
  { id: 2, name: "Bob", email: "bob@example.com", role: Role.Editor, createdAt: new Date("2024-03-15") },
  { id: 3, name: "Carol", email: "carol@example.com", role: Role.Viewer, createdAt: new Date("2024-06-10") },
  { id: 4, name: "Dave", email: "dave@example.com", role: Role.Editor, createdAt: new Date("2024-09-22") },
];

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1299.99, category: "Electronics", inStock: true },
  { id: 2, name: "Desk Chair", price: 349.50, category: "Furniture", inStock: true },
  { id: 3, name: "Monitor", price: 599.00, category: "Electronics", inStock: false },
  { id: 4, name: "Bookshelf", price: 189.00, category: "Furniture", inStock: true },
];

console.log("=== Types & Interfaces ===");
console.log("Users:", users.map((u) => `${u.name} (${u.role})`).join(", "));

// --- Generics ---
console.log("\n=== Generics ===");
console.log("identity(42):", identity(42));
console.log("getFirst([10, 20, 30]):", getFirst([10, 20, 30]));

const editors = filterBy(users, "role", Role.Editor);
console.log("Editors:", editors.map((u) => u.name).join(", "));

const stack = new Stack<string>();
stack.push("first");
stack.push("second");
stack.push("third");
console.log(`Stack size: ${stack.size}, peek: "${stack.peek()}", popped: "${stack.pop()}"`);

const userRepo = new Repository<User>();
users.forEach((u) => userRepo.add(u));
console.log(`User repo count: ${userRepo.count}, find id=2: ${userRepo.findById(2)?.name}`);

// --- Classes & Inheritance ---
console.log("\n=== Classes & Inheritance ===");
const circle = new Circle("red", 5);
const rect = new Rectangle("blue", 4, 6);
console.log(circle.describe());
console.log(rect.describe());

const serializer = new JsonSerializer();
const serialized = serializer.serialize({ name: "Alice", role: "admin" });
console.log("Serialized:", serialized);
console.log("Deserialized:", serializer.deserialize(serialized));

// --- Utility Types & Functions ---
console.log("\n=== Utility Functions ===");
const response = createApiResponse(users[0], "User fetched successfully");
console.log(`API Response: success=${response.success}, message="${response.message}"`);

const byRole = groupBy(users, "role");
console.log("Users by role:");
byRole.forEach((members, role) => {
  console.log(`  ${role}: ${members.map((u) => u.name).join(", ")}`);
});

const electronics = products.filter((p) => p.category === "Electronics");
electronics.forEach((p) => {
  console.log(`  ${p.name}: ${formatCurrency(p.price)} — ${p.inStock ? "In Stock" : "Out of Stock"}`);
});

// --- Memoization ---
console.log("\n=== Memoization ===");
const expensiveCalc = memoize((n: unknown): number => {
  console.log(`  Computing fibonacci(${n})...`);
  const fib = (x: number): number => (x <= 1 ? x : fib(x - 1) + fib(x - 2));
  return fib(n as number);
});
console.log("fib(10):", expensiveCalc(10));
console.log("fib(10) again (cached):", expensiveCalc(10));
console.log("fib(15):", expensiveCalc(15));
