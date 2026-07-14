const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://goutham:goutham123@cluster0.umdwywd.mongodb.net/nssVolunteersDB")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const volunteerData = mongoose.model(
  "volunteersData",
  new mongoose.Schema({
    volunteerId: String,
    fullName: String,
    email: String,
    yearOfStudy: String,
    phone: String,
    dateOfBirth: String,
    gender: String,
    bloodGroup: String,
    department: String,
    campName: String,
    hoursCompleted: String,
    address: String,
    unitNumber: String,
  })
);

app.get("/test", (req, res) => {
  res.send("hai");
});

app.post("/view-vol", async (req, res) => {
  try {
    const volunteers = await volunteerData.find(req.body);
    res.json(volunteers);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      error: err.message,
    });
  }
});

app.post("/add-vol", async (req, res) => {
  try {
    await volunteerData.create(req.body);
    res.json({ status: "Success" });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server Started");
});