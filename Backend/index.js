
require("dotenv").config();
const express = require('express');
const { userRouter } = require("./routes/userRoutes");
const cors = require("cors");
const { authRoute } = require("./routes/authRoutes");
require("./db")
const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(authRoute)

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
  console.log("Server running on port", PORT);

});

