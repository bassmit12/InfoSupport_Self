import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Food from "../models/foodModel.js";

// Rest of your code

// To add items to the cart
const addToCart = async (req, res) => {
  // User's ID should be obtained from session or token
  const userId = req.user._id; // This is an example, adjust accordingly.
  const { foodId, quantity, notes } = req.body; // Added 'notes' to the request body

  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      // Cart exists for user
      let itemIndex = cart.items.findIndex((p) => p.food._id == foodId);
      if (itemIndex > -1) {
        // Update the quantity and notes of an existing item
        let item = cart.items[itemIndex];
        item.quantity = quantity;
        item.notes = notes; // Adding notes
        cart.items[itemIndex] = item;
      } else {
        // Add new item to cart with notes
        cart.items.push({ food: foodId, quantity: quantity, notes: notes });
      }
      cart = await cart.save();
    } else {
      // No cart for user, create new cart with notes
      cart = await Cart.create({
        user: userId,
        items: [{ food: foodId, quantity: quantity, notes: notes }],
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To get the cart for a user
const getCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.food");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To convert the cart into an order
const convertCartToOrder = async (req, res) => {
  const userId = req.user._id;

  try {
    // Retrieve the user's cart based on the user ID
    const cart = await Cart.findOne({ user: userId }).populate("items.food");

    // Check if the cart exists. If not, return a 404 error.
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Calculate the total cost of the order
    const total = calculateTotal(cart.items);

    // Create a new order object using the retrieved cart items and the total cost
    const order = new Order({
      table: cart.user, // Assuming the user ID represents the table in this case
      items: cart.items.map((item) => ({
        food: item.food,
        quantity: item.quantity,
        notes: item.notes,
      })),
      total: total,
      // You can add more fields to the order object if needed, such as notes or payment method
    });

    // Save the new order object to the database
    await order.save();

    // Optionally, you can clear the user's cart after the order is successfully created
    cart.items = [];
    await cart.save();

    // Return the created order object in the response
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To remove an item from the cart
const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { foodId } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = cart.items.filter((item) => item.food._id != foodId);
      cart = await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To update the quantity of an item in the cart
const updateCartQuantity = async (req, res) => {
  const userId = req.user._id;
  const { foodId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      let itemIndex = cart.items.findIndex((p) => p.food._id == foodId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        cart = await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: "Item not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to calculate total based on items in the cart
const calculateTotal = (items) => {
  return items.reduce(
    (total, item) => total + item.food.price * item.quantity,
    0
  );
};

// Add more functions as needed for updating and removing cart items

export {
  addToCart,
  getCart,
  convertCartToOrder,
  removeFromCart,
  updateCartQuantity,
};
