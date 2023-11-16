import {
  getUserProfile,
  signupUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../../../controller/userController.js"; // Replace with your actual file name
import * as UserRepository from "../../../db/repository/userRepository.js";

// Import your mock data
import { mockUserId, mockUser } from "./userControllerMocks.js";

jest.mock("../../../helpers/generateTokenAndSetCookie.js", () => {
  return jest.fn(() => {
    console.log("Mocked generateTokenAndSetCookie function called");
  });
});

// Mocking the UserRepository functions
jest.mock("../../../db/repository/userRepository.js");

describe("User Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserProfile", () => {
    it("should get user profile successfully", async () => {
      UserRepository.getUserProfile.mockResolvedValueOnce(mockUser);
      const req = { params: { query: mockUserId } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getUserProfile(req, res);

      expect(UserRepository.getUserProfile).toHaveBeenCalledWith(mockUserId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle user not found", async () => {
      UserRepository.getUserProfile.mockResolvedValueOnce(null);
      const req = { params: { query: "nonexistentUserId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getUserProfile(req, res);

      expect(UserRepository.getUserProfile).toHaveBeenCalledWith(
        "nonexistentUserId"
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    it("should handle internal server error", async () => {
      UserRepository.getUserProfile.mockRejectedValueOnce(
        new Error("Some error")
      );
      const req = { params: { query: mockUserId } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getUserProfile(req, res);

      expect(UserRepository.getUserProfile).toHaveBeenCalledWith(mockUserId);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Some error" });
    });
  });

  describe("signupUser", () => {
    it("should signup user successfully", async () => {
      UserRepository.signupUser.mockResolvedValueOnce(mockUser);
      const req = { body: { ...mockUser } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await signupUser(req, res);

      expect(UserRepository.signupUser).toHaveBeenCalledWith({
        tableNumber: mockUser.tableNumber,
        capacity: mockUser.capacity,
        username: mockUser.username,
        password: mockUser.password,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: mockUser._id,
        tableNumber: mockUser.tableNumber,
        capacity: mockUser.capacity,
        username: mockUser.username,
        isOccupied: mockUser.isOccupied,
        currentOrder: mockUser.currentOrder,
      });
    });

    /*
    it("should handle invalid user data", async () => {
      UserRepository.signupUser.mockResolvedValueOnce(null);
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await signupUser(req, res);

      expect(UserRepository.signupUser).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid user data" });
    });

    */

    it("should handle internal server error during signup", async () => {
      UserRepository.signupUser.mockRejectedValueOnce(new Error("Some error"));
      const req = { body: { ...mockUser } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await signupUser(req, res);

      expect(UserRepository.signupUser).toHaveBeenCalledWith({
        tableNumber: mockUser.tableNumber,
        capacity: mockUser.capacity,
        username: mockUser.username,
        password: mockUser.password,
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Some error" });
    });
  });

  describe("loginUser", () => {
    it("should login user successfully", async () => {
      UserRepository.loginUser.mockResolvedValueOnce(mockUser);
      const req = {
        body: { username: mockUser.username, password: mockUser.password },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await loginUser(req, res);

      expect(UserRepository.loginUser).toHaveBeenCalledWith({
        username: mockUser.username,
        password: mockUser.password,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        _id: mockUser._id,
        tableNumber: mockUser.tableNumber,
        capacity: mockUser.capacity,
        username: mockUser.username,
        isOccupied: mockUser.isOccupied,
        currentOrder: mockUser.currentOrder,
      });
    });

    /*
    it("should handle invalid username or password", async () => {
      UserRepository.loginUser.mockResolvedValueOnce(null);
      const req = {
        body: { username: "nonexistentUser", password: "wrongPassword" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await loginUser(req, res);

      expect(UserRepository.loginUser).toHaveBeenCalledWith({
        username: "nonexistentUser",
        password: "wrongPassword",
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid username or password",
      });
    });
    */

    it("should handle internal server error during login", async () => {
      UserRepository.loginUser.mockRejectedValueOnce(new Error("Some error"));
      const req = { body: { ...mockUser } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await loginUser(req, res);

      expect(UserRepository.loginUser).toHaveBeenCalledWith({
        username: mockUser.username,
        password: mockUser.password,
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Some error" });
    });
  });

  describe("logoutUser", () => {
    it("should logout user successfully", async () => {
      const req = {};
      const res = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await logoutUser(req, res);

      expect(UserRepository.logoutUser).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledWith("jwt", "", { maxAge: 1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User logged out successfully",
      });
    });
  });

  describe("updateUser", () => {
    it("should update user successfully", async () => {
      UserRepository.updateUser.mockResolvedValueOnce(mockUser);
      const req = { user: { _id: mockUserId }, body: { ...mockUser } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updateUser(req, res);

      expect(UserRepository.updateUser).toHaveBeenCalledWith(mockUserId, {
        tableNumber: mockUser.tableNumber,
        username: mockUser.username,
        password: mockUser.password,
        capacity: mockUser.capacity,
        isOccupied: mockUser.isOccupied,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle internal server error during update", async () => {
      UserRepository.updateUser.mockRejectedValueOnce(new Error("Some error"));
      const req = { user: { _id: mockUserId }, body: { ...mockUser } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updateUser(req, res);

      expect(UserRepository.updateUser).toHaveBeenCalledWith(mockUserId, {
        tableNumber: mockUser.tableNumber,
        username: mockUser.username,
        password: mockUser.password,
        capacity: mockUser.capacity,
        isOccupied: mockUser.isOccupied,
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Some error" });
    });
  });
});
