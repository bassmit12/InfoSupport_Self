const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); // Start the server
  const mongoUri = await mongoServer.getUri();
  process.env.MONGO_URI = mongoUri; // Set the MONGO_URI to the in-memory database URI
});

afterAll(async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
});
