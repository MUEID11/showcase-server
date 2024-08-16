const { userCollection } = require("./../mongoDB/collections");
const { jwtSign } = require("./jwtsign");

const signup = async (req, res) => {
  const { name, email, photoURL } = req.body;

  // Basic input validation
  if (!name || !email) {
    return res.status(400).send({ message: "Name and email are required" });
  }

  try {
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Inserting user into database
    await userCollection.insertOne({
      name,
      email,
      photoURL,
      status: "active",
      role: "user"
    });

    // Generate JWT token
    const token = jwtSign({ name, email });

    return res.status(201).send({ message: "User created successfully", token });
  } catch (error) {
    console.error(`Error during signup: ${error.message}`);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { signup };
