import User from "../models/userModel.js";

// To add items to the cart
const addToCart = async (req, res) => {
  // User's ID should be obtained from session or token
  const userId = req.user._id; // This is an example, adjust accordingly.
  const { foodId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      // Cart exists for user
      let itemIndex = cart.items.findIndex((p) => p.food._id == foodId);
      if (itemIndex > -1) {
        // Update the quantity of an existing item
        let item = cart.items[itemIndex];
        item.quantity = quantity;
        cart.items[itemIndex] = item;
      } else {
        // Add new item to cart
        cart.items.push({ food: foodId, quantity: quantity });
      }
      cart = await cart.save();
    } else {
      // No cart for user, create new cart
      cart = await Cart.create({
        user: userId,
        items: [{ food: foodId, quantity: quantity }],
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To get the cart for a user
const getCart = async (req, res) => {
  const userId = req.user._id; // This should come from session or token
  try {
    let cart = await Cart.findOne({ user: userId }).populate("items.food");
    if (!cart) {
      cart = await Cart.create({ user: userId });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const convertCartToOrder = async (req, res) => {
  const tableId = req.table._id; // Assuming you have table info in the request

  try {
    // Find the cart associated with the table
    const cart = await Cart.findOne({ table: tableId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Create a new order with items from the cart
    const order = new Order({
      table: tableId,
      items: cart.items,
      total: calculateTotal(cart.items), // You would implement this function based on item prices and quantities
      status: "Pending", // Default status
    });

    // Save the new order
    await order.save();

    // Update the table's current order
    await Table.findByIdAndUpdate(tableId, {
      isOccupied: true,
      currentOrder: order._id,
    });

    // Clear the cart (or delete if you prefer)
    await Cart.findByIdAndDelete(cart._id);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {};

const updateCartQuantity = async (req, res) => {};

// Add more functions as needed for updating and removing cart items

export {
  addToCart,
  getCart,
  convertCartToOrder,
  removeFromCart,
  updateCartQuantity,
};
