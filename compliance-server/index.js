const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const categoryRoute = require("./Routes/CategoryRoute");
const productRoute = require("./Routes/ProductRoute");
const cartRoute = require("./Routes/CartRoute");
const paymentRoute = require("./Routes/PaymentRoute");
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// app.use(
//   cors({
//     origin: ["http://localhost:8000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use(cors());
// app.options('*', cors());

app.use(cookieParser());

app.use(express.json());

app.use("/public", express.static("public"))

app.use("/", authRoute);
app.use("/", categoryRoute);
app.use("/", productRoute);
app.use("/", cartRoute);
app.use("/", paymentRoute);