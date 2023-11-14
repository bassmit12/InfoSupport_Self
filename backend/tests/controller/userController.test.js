// userController.test.js

// userController.test.js
import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import {
  signupUser,
  getUserProfile,
  loginUser,
  logoutUser,
  updateUser,
} from "../../controller/userController.js";
import User from "../../models/userModel.js";

// Create an Express app for testing
const app = express();

// Mock the generateTokenAndSetCookie function
jest.mock("../../utils/helpers/generateTokenAndSetCookie.js", () => jest.fn());

// Mock the bcrypt.compare function
jest.mock("bcryptjs", () => ({
  compare: jest.fn(() => true),
}));

// Mock the bcrypt.hash function
jest.mock("bcryptjs", () => ({
  hash: jest.fn(() => "hashedPassword"),
}));

// Mock the mongoose.Types.ObjectId.isValid function
mongoose.Types.ObjectId.isValid = jest.fn(() => true);

// Mock the User model
jest.mock("../../models/userModel.js");

// Mock the findById and save functions for the User model
const mockUserSave = jest.fn();
const mockUserFindById = jest.fn();
User.findById = mockUserFindById;
User.prototype.save = mockUserSave;

// Mock the Express request and response objects
const mockRequest = () => ({
  body: {},
  params: {},
  user: { _id: mongoose.Types.ObjectId() }, // Assuming a user is authenticated
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

// Tests for signupUser function
describe("signupUser", () => {
  it("should create a new user and return the user data along with a token", async () => {
    // Set up mock data
    const mockRequestData = {
      body: {
        tableNumber: 1,
        capacity: 4,
        username: "testuser",
        password: "testpassword",
      },
    };
    const mockResponseData = mockResponse();

    // Mock the findOne function for the User model
    User.findOne = jest.fn().mockReturnValue(null);

    // Mock the User save function
    mockUserSave.mockResolvedValueOnce({ _id: new mongoose.Types.ObjectId() });

    // Execute the signupUser function
    await signupUser(mockRequestData, mockResponseData);

    // Assertions
    expect(mockUserSave).toHaveBeenCalled();
    expect(mockResponseData.status).toHaveBeenCalledWith(201);
    expect(mockResponseData.json).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: expect.any(String),
        tableNumber: mockRequestData.body.tableNumber,
        capacity: mockRequestData.body.capacity,
        username: mockRequestData.body.username,
        isOccupied: false, // Assuming a default value
        currentOrder: null, // Assuming a default value
      })
    );
  });

  // Add more tests for error cases and edge cases
});

// Tests for getUserProfile function
describe("getUserProfile", () => {
  // Write tests for getUserProfile function
});

// Tests for loginUser function
describe("loginUser", () => {
  // Write tests for loginUser function
});

// Tests for logoutUser function
describe("logoutUser", () => {
  // Write tests for logoutUser function
});

// Tests for updateUser function
describe("updateUser", () => {
  // Write tests for updateUser function
});
