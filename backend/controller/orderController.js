import * as OrderRepository from "../db/repository/orderRepository.js";

const getOrderFeed = async (req, res) => {
  try {
    const orders = await OrderRepository.getOrderFeed();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await OrderRepository.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { id, status, notes } = req.body;

  try {
    const order = await OrderRepository.updateOrder({ id, status, notes });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const completeOrder = async (req, res) => {
  const orderId = req.body.id;

  try {
    await OrderRepository.completeOrder(orderId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getOrderFeed, getOrder, updateOrder, completeOrder };
