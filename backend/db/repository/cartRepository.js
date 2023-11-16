import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

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
      let itemIndex = cart.items.findIndex((p) => p.food._id == foodId);
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = quantity;
        item.notes = notes;
        cart.items[itemIndex] = item;
      } else {
        cart.items.push({ food: foodId, quantity: quantity, notes: notes });
      }
      cart = await cart.save();
    } else {
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

    const total = calculateTotal(cart.items);

    const order = new Order({
      table: cart.user,
      items: cart.items.map((item) => ({
        food: item.food,
        quantity: item.quantity,
        notes: item.notes,
      })),
      total: total,
    });

    await order.save();
    cart.items = [];
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
