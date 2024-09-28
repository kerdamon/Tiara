import { connectToMongo, disconnectFromMongo } from "@/config/database.js";
import { User } from "@/models/user.js";
import "dotenv/config";

describe("MongoDB User integration test", () => {
  beforeAll(() => {
    return connectToMongo("mongodb://admin:admin@localhost:27017");
  });

  afterAll(() => {
    return disconnectFromMongo();
  });

  test("Succesfully save an user to db", async () => {
    const newUser = await new User({
      email: "dupa@gmail.com",
      passwordHash: "bubabiba",
      salt: "123",
    }).save();

    return User.findById(newUser._id)
      .then((user) => expect(user?.email).toBe(newUser.email))
      .then(() => User.findByIdAndDelete(newUser._id));
  });
});
