const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
const authMiddleware = require("../middleware/auth");


// ✅ Create user (Protected)
userRouter.post("/user/data", authMiddleware, (req, res) => {
    const { firstName, lastName, email, mobileNumber } = req.body;
console.log("BODY:", req.body);
console.log("USER ID:", req.userId);
    userModel.createUser(
        firstName,
        lastName,
        email,
        mobileNumber,
        req.userId,
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "DB Error", error: err });
            }
            res.status(201).send({
                message: "New user added",
                userId: req.userId
            });
        }
    );
});


// ✅ Get logged-in user data
userRouter.get("/user/data", authMiddleware, (req, res) => {
    userModel.getUserByUserId(req.userId, (err, results) => {
        if (err) {
            return res.status(500).send({ message: "DB Error", error: err });
        }

        res.status(200).send({
            message: results.length ? "User data fetched" : "No data found",
            data: results
        });
    });
});


// ✅ Create user without auth
userRouter.post("/user/all", (req, res) => {
    const { firstName, lastName, email, mobileNumber } = req.body;

    userModel.createUser(
        firstName,
        lastName,
        email,
        mobileNumber,
        null,
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: "DB Error", error: err });
            }
            res.status(201).send({ message: "New user added" });
        }
    );
});


// ✅ Get all users
userRouter.get("/user/all", (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) {
            return res.status(500).send({ message: "DB Error", error: err });
        }
        res.send(results);
    });
});


// ✅ Update user
userRouter.put("/user/:id", (req, res) => {
    const { firstName, lastName, email, mobileNumber } = req.body;
    const id = req.params.id;

    userModel.updateUser(id, firstName, lastName, email, mobileNumber, (err, result) => {
        if (err) {
            return res.status(500).send({ message: "DB Error", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send({ message: "User updated successfully" });
    });
});


// ✅ Delete user
userRouter.delete("/user/:id", (req, res) => {
    const id = req.params.id;

    userModel.deleteUser(id, (err, result) => {
        if (err) {
            return res.status(500).send({ message: "DB Error", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send({ message: "User deleted successfully" });
    });
});

module.exports = {
    userRouter
};