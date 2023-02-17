const admin = require("firebase-admin");
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { json } = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const connectDB = require("./src/config/db.config")

const appointmentRoutes = require("./src/routes/appointmentRoutes")

const blogRoutes = require("./src/routes/blogRoutes")
const ordersRoutes = require("./src/routes/orderRoutes")
const reviewRoutes = require("./src/routes/reviewRoutes")
const stripeRoutes = require("./src/routes/stripeRoutes")
const userRoutes = require("./src/routes/userRoutes")

// middleware for cors policy and accepting json fotmat
app.use(cors());
app.use(json());
connectDB()
// firebase admin old method

// const serviceAccount = require("./health-treatment-firebase-sdk.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });



// main routes start------------------------

app.use("/appointments",appointmentRoutes)
app.use("/blogs",blogRoutes)
app.use("/orders",ordersRoutes)
app.use("/reviews",reviewRoutes)
app.use("/stripe",stripeRoutes)
app.use("/users",userRoutes)

// main routes end ---------------------

app.get("/", (req, res) => {
  res.send("This is a server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
