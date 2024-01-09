// cartController.test.js
import {
  mockUserId,
  mockFoodId,
  mockQuantity,
  mockNotes,
} from "./cartControllerMocks";
import * as CartController from "../../../controller/cartController.js";

describe("Cart Controller", () => {
  describe("addToCart", () => {
    test("should add item to cart", async () => {
      const req = {
        user: { _id: mockUserId },
        body: { foodId: mockFoodId, quantity: mockQuantity, notes: mockNotes },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await CartController.addToCart(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        user: mockUserId,
        items: [{ food: mockFoodId, quantity: mockQuantity, notes: mockNotes }],
      });
    });
  });

  describe("getCart", () => {
    test("should get user cart", async () => {
      const req = {
        user: { _id: mockUserId },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await CartController.getCart(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: mockUserId,
        items: [],
      });
    });
  });

  describe("convertCartToOrder", () => {
    test("should convert cart to order", async () => {
      const req = {
        user: { _id: mockUserId },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await CartController.convertCartToOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        table: mockUserId,
        items: [],
        total: 0,
      });
    });
  });

  describe("removeFromCart", () => {
    test("should remove item from cart", async () => {
      const req = {
        user: { _id: mockUserId },
        body: { foodId: mockFoodId },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await CartController.removeFromCart(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: mockUserId,
        items: [],
      });
    });
  });

  describe("updateCartQuantity", () => {
    test("should update item quantity in cart", async () => {
      const req = {
        user: { _id: mockUserId },
        body: { foodId: mockFoodId, quantity: mockQuantity },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await CartController.updateCartQuantity(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: mockUserId,
        items: [{ food: mockFoodId, quantity: mockQuantity }],
      });
    });
  });
});
