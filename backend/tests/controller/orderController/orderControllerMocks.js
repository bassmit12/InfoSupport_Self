// orderControllerMocks.js
import * as OrderRepository from "../../../db/repository/orderRepository";

// Mocking the OrderRepository functions
jest.mock("../../../db/repository/orderRepository");

export const mockOrderId = "mockOrderId";
export const mockOrder = {
  table: "mockTableId",
  items: [{ food: "mockFoodId", quantity: 2, notes: "mockNotes" }],
  status: "Pending",
  total: 20,
  notes: "mockOrderNotes",
};

OrderRepository.getOrderFeed.mockImplementation(async () => {
  // Mock the implementation as needed
  return [mockOrder];
});

OrderRepository.getOrderById.mockImplementation(async (orderId) => {
  // Mock the implementation as needed
  if (orderId === mockOrderId) {
    return mockOrder;
  } else {
    return null; // Assuming orderId not found
  }
});

OrderRepository.updateOrder.mockImplementation(
  async ({ id, status, notes }) => {
    // Mock the implementation as needed
    if (id === mockOrderId) {
      return {
        ...mockOrder,
        _id: id,
        status,
        notes,
      };
    } else {
      return null; // Assuming orderId not found
    }
  }
);

OrderRepository.completeOrder.mockImplementation(async (orderId) => {
  // Mock the implementation as needed
  if (orderId === mockOrderId) {
    return mockOrder;
  } else {
    return null; // Assuming orderId not found
  }
});
