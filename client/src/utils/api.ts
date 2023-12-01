import axios from "axios";
import { requestHandler } from "./RequestHandler";
import { FoodItem } from "../types/types";

interface getFoodInfoParams {
  id: string;
}

export const getFoodItemInfo = requestHandler<getFoodInfoParams, FoodItem>(
  (params) => axios.get(`/api/food/item/${params?.id || ""}`)
);
