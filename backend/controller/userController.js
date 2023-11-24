import * as UserRepository from "../db/repository/userRepository.js";
import generateTokenAndSetCookie from "../helpers/generateTokenAndSetCookie.js";

const getUserProfile = async (req, res) => {
  const { query } = req.params;

  try {
    const user = await UserRepository.getUserProfile(query);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const signupUser = async (req, res) => {
  try {
    const { tableNumber, capacity, username, password, role } = req.body;
    const newUser = await UserRepository.signupUser({
      tableNumber,
      capacity,
      username,
      password,
      role,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        tableNumber: newUser.tableNumber,
        capacity: newUser.capacity,
        username: newUser.username,
        isOccupied: newUser.isOccupied,
        currentOrder: newUser.currentOrder,
        role: newUser.role,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRepository.loginUser({ username, password });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      tableNumber: user.tableNumber,
      capacity: user.capacity,
      username: user.username,
      isOccupied: user.isOccupied,
      currentOrder: user.currentOrder,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    UserRepository.logoutUser();
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { tableNumber, username, password, capacity, isOccupied, role } =
    req.body;

  try {
    const updatedUser = await UserRepository.updateUser(userId, {
      tableNumber,
      username,
      password,
      capacity,
      isOccupied,
      role,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getUserProfile, signupUser, loginUser, logoutUser, updateUser };
