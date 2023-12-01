import * as CartRepository from "../db/repository/cartRepository.js";

const addToCart = async (req, res) => {
  if (req.user && req.user._id) {
    const userId = req.user._id;
    const { foodId, quantity, notes } = req.body;

    if (!foodId || !quantity || !notes) {
      res.status(400).json({ message: "Invalid input data" });
      return;
    }

    try {
      const cart = await CartRepository.createOrUpdateCartItem(
        userId,
        foodId,
        quantity,
        notes
      );
      if (cart) {
        const { _id, name, price } = cart; // Only necessary fields
        res.status(201).json({ _id, name, price });
      } else {
        res
          .status(500)
          .json({ message: "Failed to create or update cart item." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid user" });
  }
};

const getCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await CartRepository.getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const convertCartToOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const order = await CartRepository.convertCartToOrder(userId);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { foodId } = req.body;

  try {
    const cart = await CartRepository.removeFromCart(userId, foodId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  const userId = req.user._id;
  const { foodId, quantity } = req.body;

  try {
    const cart = await CartRepository.updateCartQuantity(
      userId,
      foodId,
      quantity
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  addToCart,
  getCart,
  convertCartToOrder,
  removeFromCart,
  updateCartQuantity,
};
