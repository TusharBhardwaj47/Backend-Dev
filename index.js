import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 8000;

// middleware
app.use(express.json());

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/chatApp")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Error while connecting with DB");
  });

// schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  gpa: {
    type: Number
  }
});

// model
const Student = mongoose.model("Student", studentSchema);

// GET all students
app.get("/", async (req, res) => {
  const data = await Student.find();
  res.status(200).json(data);
});

// CREATE student
app.post("/", async (req, res) => {
  const { name, age, gpa } = req.body;
  const data = await Student.create({ name, age, gpa });
  res.status(201).json(data);
});

// server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});