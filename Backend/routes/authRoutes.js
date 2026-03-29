const express = require("express")
const jwt = require("jsonwebtoken")
const authModel =require("../models/authModel")
const bcrypt=require("bcrypt")
const authMiddleware = require("../middleware/auth")
const authRoute = express.Router()

authRoute.post("/signup",(req, res) => {
  const { name, email, password } = req.body;
  authModel.getAuthByEmail(email, async (err, results) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    authModel.createAuth(name, email, hashedPassword, (err, result) => {
      if (err) {
        console.log("INSERT ERROR:", err);
        return res.status(500).send(err);
      }
       const token = require("jsonwebtoken").sign(
        { userId: result.insertId },
        "secretkey",
        { expiresIn: "1d" }
      );
      res.status(201).send({ message: "User registered successfully" ,token });
    });
  });
});

authRoute.post("/login", (req, res) => {
  const { email, password } = req.body;

  authModel.getAuthByEmail(email, async (err, users) => {
    if (err) {
      return res.status(500).send({ message: "DB Error", error: err });
    }
    if (users.length === 0) {
      return res.status(400).send({ message: "User not found" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      "secretkey",
      { expiresIn: "1d" }
    );
    res.status(200).send({
      message: "Login Successful",
      token
    });
  });
});


authRoute.post("/logout", async(req,res)=>{
    try {
        res.status(200).send({message: "logged out successfully"})
    } catch (error) {
      res.status(500).send({message:"Error logging out"})   
    }
})

module.exports={
    authRoute
}