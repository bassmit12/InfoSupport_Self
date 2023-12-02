import axios from "axios";
import { requestHandler } from "./RequestHandler";
import { FoodItem } from "../types/types";

interface FoodInfoParams {
  id: string;
}

export const getFoodItemInfo = requestHandler<FoodInfoParams, FoodItem>(
  (params) => axios.get(`/api/food/item/${params?.id ?? ""}`)
);
