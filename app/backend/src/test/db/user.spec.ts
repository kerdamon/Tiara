import { connectToMongo } from "@/config/database.js"
import { IUser, User } from "@/models/user.js"

describe("MongoDB User integration test", () => {
  beforeEach(() => {
    return connectToMongo()
  })

  test("Succesfully save an user to db", async () => {
    const newUser = await new User({
        email: "dupa@gmail.com",
        passwordHash: "bubabiba",
        salt: "123",
    }).save()

    return User.findById(newUser._id).then(user => expect(user?.email).toBe(newUser.email) )
  })
})

