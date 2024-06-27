const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require("cors");
const app = express();
const prisma = new PrismaClient();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
require("dotenv").config();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Define routes
// app.get('/users', async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.post('/users', async (req, res) => {
//   const { email, name } = req.body;
//   const user = await prisma.user.create({
//     data: { email, name },
//   });
//   res.json(user);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});