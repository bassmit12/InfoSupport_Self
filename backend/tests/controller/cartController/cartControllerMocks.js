// cartControllerMocks.js
import * as CartRepository from "../../../db/repository/cartRepository.js";

// Mocking the CartRepository functions
jest.mock("../../../db/repository/cartRepository");

export const mockUserId = "mockUserId";

CartRepository.createOrUpdateCartItem.mockImplementation(
  async (userId, foodId, quantity, notes) => {
    // Mock the implementation as needed
    return {
      user: mockUserId,
      items: [{ food: foodId, quantity, notes }],
    };
  }
);

CartRepository.getCartByUserId.mockImplementation(async (userId) => {
  // Mock the implementation as needed
  return {
    user: mockUserId,
    items: [],
  };
});

CartRepository.convertCartToOrder.mockImplementation(async (userId) => {
  // Mock the implementation as needed
  return {
    table: mockUserId,
    items: [],
    total: 0,
  };
});

CartRepository.removeFromCart.mockImplementation(async (userId, foodId) => {
  // Mock the implementation as needed
  return {
    user: mockUserId,
    items: [],
  };
});

CartRepository.updateCartQuantity.mockImplementation(
  async (userId, foodId, quantity) => {
    // Mock the implementation as needed
    return {
      user: mockUserId,
      items: [{ food: foodId, quantity }],
    };
  }
);
