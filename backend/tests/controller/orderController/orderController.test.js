// orderController.test.js
import { mockOrderId, mockOrder } from "./orderControllerMocks";
import * as OrderController from "../../../controller/orderController";

describe("Order Controller", () => {
  describe("getOrderFeed", () => {
    test("should get order feed", async () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await OrderController.getOrderFeed(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockOrder]);
    });
  });

  describe("getOrder", () => {
    test("should get order by id", async () => {
      const req = {
        params: {
          id: mockOrderId,
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await OrderController.getOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });
  });

  describe("updateOrder", () => {
    test("should update order", async () => {
      const req = {
        body: {
          id: mockOrderId,
          status: "Cooking",
          notes: "Updated notes",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await OrderController.updateOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        ...mockOrder,
        _id: mockOrderId,
        status: "Cooking",
        notes: "Updated notes",
      });
    });
  });

  describe("completeOrder", () => {
    test("should complete order", async () => {
      const req = {
        body: {
          id: mockOrderId,
        },
      };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };

      await OrderController.completeOrder(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
