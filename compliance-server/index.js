const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const authRoute = require("./Routes/AuthRoute");
const roleRoute = require("./Routes/RoleRoute");
const siteRoute = require("./Routes/SiteRoute");
const LOBRoute = require("./Routes/LOBRoute");
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

// Middleware to handle larger request payloads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

app.use(express.json());

app.use("/public", express.static("public"))


app.use("/", authRoute);
app.use("/", roleRoute);
app.use("/", siteRoute);
app.use("/", LOBRoute);