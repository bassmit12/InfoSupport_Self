import Order from "../models/orderModel.js";

const getOrderFeed = async () => {
  try {
    const orders = await Order.find()
      .populate("items.food")
      .sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items.food");
    return order;
  } catch (error) {
    throw error;
  }
};

const updateOrder = async ({ id, status, notes }) => {
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true }
    ).populate("items.food");

    return order;
  } catch (error) {
    throw error;
  }
};

const completeOrder = async (orderId) => {
  try {
    const order = await Order.findByIdAndRemove(orderId);
    return order;
  } catch (error) {
    throw error;
  }
};

export { getOrderFeed, getOrderById, updateOrder, completeOrder };
