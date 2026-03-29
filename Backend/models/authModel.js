const db = require("../db");

const createAuth = (name, email, password, callback) => {
  const sql = "INSERT INTO auth (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], callback);
};


const getAuthById = (id, callback) => {
  db.query("SELECT * FROM auth WHERE id = ?", [id], callback);
};


const getAuthByEmail = (email, callback) => {
  db.query("SELECT * FROM auth WHERE email = ?", [email], callback);
};

module.exports = {
  createAuth,
  getAuthById,
  getAuthByEmail
};

















// const db = require("../db");


// const createUser = (firstName, lastName, email, mobileNumber, userId, callback) => {
//   const sql = `
//     INSERT INTO users (firstName, lastName, email, mobileNumber, userId)
//     VALUES (?, ?, ?, ?, ?)
//   `;
//   db.query(sql, [firstName, lastName, email, mobileNumber, userId], callback);
// };

// const getUsers = (callback) => {
//   db.query("SELECT * FROM users", callback);
// };


// const getUserByUserId = (userId, callback) => {
//   db.query("SELECT * FROM users WHERE userId = ?", [userId], callback);
// };


// const updateUser = (id, firstName, lastName, email, mobileNumber, callback) => {
//   const sql = `
//     UPDATE users 
//     SET firstName=?, lastName=?, email=?, mobileNumber=? 
//     WHERE id=?
//   `;
//   db.query(sql, [firstName, lastName, email, mobileNumber, id], callback);
// };

// const deleteUser = (id, callback) => {
//   db.query("DELETE FROM users WHERE id = ?", [id], callback);
// };

// module.exports = {
//   createUser,
//   getUsers,
//   getUserByUserId,
//   updateUser,
//   deleteUser
// };























