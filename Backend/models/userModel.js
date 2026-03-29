const db = require("../db");

const createUser = (firstName, lastName, email, mobileNumber, userId, callback) => {
    const sql = `
        INSERT INTO users (firstName, lastName, email, mobileNumber, userId)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [firstName, lastName, email, mobileNumber, userId], callback);
};

const getUserByUserId = (userId, callback) => {
    db.query("SELECT * FROM users WHERE userId = ?", [userId], callback);
};

const getAllUsers = (callback) => {
    db.query("SELECT * FROM users", callback);
};

const updateUser = (id, firstName, lastName, email, mobileNumber, callback) => {
    const sql = `
        UPDATE users 
        SET firstName=?, lastName=?, email=?, mobileNumber=?
        WHERE id=?
    `;
    db.query(sql, [firstName, lastName, email, mobileNumber, id], callback);
};

const deleteUser = (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], callback);
};

module.exports = {
    createUser,
    getUserByUserId,
    getAllUsers,
    updateUser,
    deleteUser
};