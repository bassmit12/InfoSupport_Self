// userControllerMocks.js
import * as UserRepository from "../../../db/repository/userRepository";

// Mocking the UserRepository functions
jest.mock("../../../db/repository/userRepository");

export const mockUserId = "mockUserId";
export const mockUser = {
  tableNumber: 1,
  username: "mockUser",
  password: "mockPassword",
  capacity: 4,
  isOccupied: false,
  currentOrder: "mockOrderId",
};

UserRepository.getUserProfile.mockImplementation(async (query) => {
  try {
    let user;

    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select("-password")
        .select("-updatedAt");
    } else {
      user = await User.findOne({ username: query })
        .select("-password")
        .select("-updatedAt");
    }

    return user;
  } catch (err) {
    throw err;
  }
});

UserRepository.signupUser.mockImplementation(
  async ({ tableNumber, capacity, username, password }) => {
    try {
      const user = await User.findOne({ $or: [{ tableNumber }, { username }] });

      if (user) {
        throw new Error("User already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        tableNumber,
        capacity,
        username,
        password: hashedPassword,
      });

      await newUser.save();

      return newUser;
    } catch (err) {
      throw err;
    }
  }
);

UserRepository.loginUser.mockImplementation(async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      throw new Error("Invalid username or password");
    }

    if (user.isFrozen) {
      user.isFrozen = false;
      await user.save();
    }

    return user;
  } catch (error) {
    throw error;
  }
});

UserRepository.logoutUser.mockImplementation(() => {
  // No async operation for logging out, so no need for repository function
});

UserRepository.updateUser.mockImplementation(
  async (userId, { tableNumber, username, password, capacity, isOccupied }) => {
    try {
      let user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }

      user.tableNumber = tableNumber || user.tableNumber;
      user.username = username || user.username;
      user.capacity = capacity || user.capacity;
      user.isOccupied = isOccupied || user.isOccupied;

      user = await user.save();

      // password should be null in response
      user.password = null;

      return user;
    } catch (err) {
      throw err;
    }
  }
);
