const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/RegistrationRoutes");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const dotenv = require("dotenv"); // Import dotenv package
dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT; 
const MONGO_URL = process.env.MONGO_URL; 


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
  console.log(`server is listening on port ${PORT}`);
});
