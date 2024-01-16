// test/db/connectDB.test.js
const mongoose = require("mongoose");
import { dotenv } from "dotenv";

describe("MongoDB Memory Server", () => {
  test("should connect using MONGO_URI from environment", async () => {
    const uri = process.env.MONGO_URI;
    expect(uri).toBeDefined();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if the connection is active
    const connectionState = mongoose.connection.readyState;
    expect(connectionState).toBe(1); // 1 means connected

    // Get a reference to the test collection
    const testCollection = mongoose.connection.collection("test");

    // Insert a document and check the result
    const insertResult = await testCollection.insertOne({ test: "data" });
    expect(insertResult.acknowledged).toBeTruthy();
    expect(insertResult.insertedId).toBeDefined();

    // Clean up after test
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });
});
