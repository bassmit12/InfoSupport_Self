import Order from "../models/orderModel.js";

// To get the order feed
const getOrderFeed = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.food")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To get a specific order by ID
const getOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId).populate("items.food");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To update an order
const updateOrder = async (req, res) => {
  const { id, status, notes } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true }
    ).populate("items.food");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// To complete (delete) an order
const completeOrder = async (req, res) => {
  const { id } = req.body;

  try {
    const order = await Order.findByIdAndRemove(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getOrderFeed, getOrder, updateOrder, completeOrder };
