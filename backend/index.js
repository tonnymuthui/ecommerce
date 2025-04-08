// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/products", productRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/cart", cartRoutes);



mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB Connection Eroor", err))


// test route
// app.get("/", (req, res) => {
//     res.send("Kiinda is running..");
// });

// routes
app.use("/api/auth", authRoutes);

//a test route for auth usr
app.get("api/protected", protect, (req, res) => {
    res.json({message: "Protected route!!", userId: req.userId});
})


//starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))