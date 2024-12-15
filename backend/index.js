const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 5000;

const DB = process.env.MONGO_URI;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "https://90-s-blog-codedex-hackathon.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(helmet());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the Truewallet API!",
  });
});
// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/posts", postRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error handler
app.use(globalErrorHandler);

// Database connection
mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((err) => {
    console.log(`Error while connecting to database: ${err}`);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
