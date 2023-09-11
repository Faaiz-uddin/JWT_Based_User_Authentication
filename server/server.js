const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const authRoute = require("./routes/RegistrationRoutes");
const cookieParser = require("cookie-parser"); // Import cookie-parser

const PORT = 4000;
const MONGO_URL =
  "mongodb+srv://crudapp:merncrud@crudapp123.l7ryky0.mongodb.net/login_auth_jwt";

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is connected successfully");
  })
  .catch((err) => console.error(err));

app.use(cors()); // Enable CORS for your API if needed
app.use(express.json()); // Apply express.json() middleware before routes
// Middleware for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware

app.use("/api", authRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});