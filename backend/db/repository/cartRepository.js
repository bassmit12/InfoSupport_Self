import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Food from "../models/foodModel.js";
import { io } from "../../server.js";

const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.food");
    return cart;
  } catch (error) {
    throw error;
  }
};

const createOrUpdateCartItem = async (userId, foodId, quantity, notes) => {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Find the index of the first item with the same foodId
      let itemIndex = cart.items.findIndex((item) => item.food._id == foodId);

      if (itemIndex > -1) {
        // If an item with the same foodId exists
        if (notes === "") {
          // If notes are empty, update the quantity of the existing item
          cart.items[itemIndex].quantity += quantity;
        } else {
          // If notes are present, add a new item with the notes
          cart.items.push({ food: foodId, quantity: quantity, notes: notes });
        }
      } else {
        // If no item with the same foodId exists, add a new item with the notes
        cart.items.push({ food: foodId, quantity: quantity, notes: notes });
      }

      cart = await cart.save();
    } else {
      // If the cart doesn't exist, create a new cart with the item
      cart = await Cart.create({
        user: userId,
        items: [{ food: foodId, quantity: quantity, notes: notes }],
      });
    }

    return cart;
  } catch (error) {
    throw error;
  }
};

const convertCartToOrder = async (userId) => {
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Iterate through each item in the cart and update the stock
    for (const item of cart.items) {
      const foodId = item.food._id;
      const quantity = item.quantity;

      // Retrieve the food item from the database
      const foodItem = await Food.findById(foodId);

      // Update the stock for the food item
      if (foodItem) {
        foodItem.stock -= quantity;
        await foodItem.save();

        io.emit("stockUpdate", {
          foodId: foodItem._id,
          newStock: foodItem.stock,
        });
      } else {
        throw new Error(`Food item with ID ${foodId} not found`);
      }
    }

    // Calculate the total price
    const total = calculateTotal(cart.items);

    // Create a new order
    const order = new Order({
      table: cart.user,
      items: cart.items.map((item) => ({
        food: item.food,
        quantity: item.quantity,
        notes: item.notes,
      })),
      total: total,
    });

    // Save the order to the database
    await order.save();

    // Clear the items in the cart
    cart.items = [];

    // Save the updated cart
    await cart.save();

    return order;
  } catch (error) {
    throw error;
  }
};

const removeFromCart = async (userId, foodId) => {
  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = cart.items.filter((item) => item.food._id != foodId);
      cart = await cart.save();
      return cart;
    } else {
      throw new Error("Cart not found");
    }
  } catch (error) {
    throw error;
  }
};

const updateCartQuantity = async (userId, foodId, quantity) => {
  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      let itemIndex = cart.items.findIndex((p) => p.food._id == foodId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        cart = await cart.save();
        return cart;
      } else {
        throw new Error("Item not found in cart");
      }
    } else {
      throw new Error("Cart not found");
    }
  } catch (error) {
    throw error;
  }
};

const calculateTotal = (items) => {
  return items.reduce(
    (total, item) => total + item.food.price * item.quantity,
    0
  );
};

export {
  getCartByUserId,
  createOrUpdateCartItem,
  convertCartToOrder,
  removeFromCart,
  updateCartQuantity,
};
