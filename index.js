require("dotenv").config();
const {client} = require('./mongoDB/client')
const express = require("express");
const cors = require("cors");
const app = express();
const { signup } = require('./path/to/signup');
const { login } = require("./controller/login");
const port = process.env.port || 5000;
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

app.use(express.json());


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    app.post('/signup', async(req, res) => await signup(req, res));
    app.post('/login', async(req,res) => await login(req, res));
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.setEncoding("server is running");
});
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
