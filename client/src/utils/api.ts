import axios from "axios";
import { requestHandler } from "./RequestHandler";
import { CartItem, FoodItem, Table } from "../types/types";

interface FoodInfoParams {
  id: string;
}

interface CartAddParams {
  foodId: string | undefined;
  quantity: number;
  notes: string;
}

interface LoginParams {
  username: string;
  password: string;
}

interface SignupParams {
  tableNumber: number;
  capacity: number;
  username: string;
  password: string;
  role: string;
}

export const getFoodItemInfo = requestHandler<FoodInfoParams, FoodItem>(
  (params) => axios.get(`/api/food/item/${params?.id ?? ""}`)
);

export const addToCart = requestHandler<CartAddParams, void>((params) =>
  axios.post("/api/cart/add", params)
);

export const loginUser = requestHandler<LoginParams, Table>((params) =>
  axios.post("/api/users/login", params)
);

export const logoutUser = requestHandler<void, void>(() =>
  axios.post("/api/users/logout")
);

export const signupUser = requestHandler<SignupParams, void>((params) =>
  axios.post("/api/users/signup", params)
);

export const fetchFoodItems = requestHandler<void, FoodItem[]>(() =>
  axios.get("/api/food/feed")
);

export const fetchCartData = requestHandler<void, { items: CartItem[] }>(() =>
  axios.get("/api/cart")
);

export const placeOrder = requestHandler<void, void>(() =>
  axios.post("/api/cart/convert-to-order")
);

export const updateQuantity = requestHandler<
  { foodId: string; quantity: number },
  void
>((params) => axios.put("/api/cart/update-quantity", params));

export const removeItem = requestHandler<{ foodId: string }, void>((params) =>
  axios.delete("/api/cart/remove", { data: params })
);
