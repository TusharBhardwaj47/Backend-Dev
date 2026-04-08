import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

const app = express();
const port = 8000;

// middleware
app.use(express.json());

//  Rate Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // max 5 requests per IP
  message: "Too many requests, try again later"
});

// apply limiter to /user route only
app.use("/user", limiter);

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/testDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB Error:", err));

// schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number
});

// model
const User = mongoose.model("User", userSchema);


//  GET all users (with try-catch)
app.get("/user", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message
    });
  }
});


//  CREATE user
app.post("/user", async (req, res) => {
  try {
    const { name, age } = req.body;

    const user = await User.create({ name, age });

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message
    });
  }
});


// server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});