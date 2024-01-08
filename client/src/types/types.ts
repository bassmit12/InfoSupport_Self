// types/types.ts
interface FoodItem {
  _id: string;
  name: string;
  descriptionLong: string;
  descriptionShort: string;
  price: number;
  category: "Breakfast" | "Lunch" | "Dinner";
  imageURL: string;
  ingredients: string[];
  dietaryInfo: "Vegetarian" | "Vegan" | "Gluten-free"; // Optional
  createdAt: string;
  updatedAt: string;
  stock: number;
}

interface CartItem {
  _id: string;
  food: FoodItem;
  quantity: number;
  notes?: string; // Optional
}

interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  session?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  _id: string;
  food: FoodItem;
  quantity: number;
  notes?: string; // Optional
}

interface Order {
  _id: string;
  table: string;
  items: OrderItem[];
  tableNumber?: number;
  status: "Pending" | "Accepted" | "Cooking" | "Served" | "Paid";
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Table {
  _id: string;
  tableNumber: number;
  username: string;
  password: string;
  capacity: number;
  isOccupied: boolean;
  currentOrder?: string; // Assuming you will store the Order _id here
  createdAt: string;
  updatedAt: string;
}

export type { FoodItem, CartItem, Cart, OrderItem, Order, Table };
