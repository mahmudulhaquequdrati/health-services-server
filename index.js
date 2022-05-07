const admin = require("firebase-admin");
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const { json } = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// middleware for cors policy and accepting json fotmat
app.use(cors());
app.use(json());

// firebase admin old method

// const serviceAccount = require("./health-treatment-firebase-sdk.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tkswl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function verifyToken(req, res, next) {
  if (req?.headers?.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      // sending data to request
      req.decodedEmail = decodedUser.email;
    } catch (error) {
      console.log(error);
    }
  }
  next();
}

async function run() {
  try {
    await client.connect();
    // to check that if there is any issue or not
    console.log("connected");

    const database = client.db("your-health-treatment");
    const blogs = database.collection("blogs");
    const reviews = database.collection("reviews");
    const appointments = database.collection("appointments");
    const orders = database.collection("orders");
    const users = database.collection("users");

    // Get appointment
    app.get("/appointments", async (req, res) => {
      const query = appointments.find({});
      const result = await query.toArray();
      res.send(result);
    });

    // Get all users appointments
    app.get("/userAppointments", async (req, res) => {
      const query = orders.find({});
      const result = await query.toArray();
      res.send(result);
    });

    // Get an user total appointment
    app.get("/userTotalAppointment", async (req, res) => {
      const email = req.query.email;
      const query = { patientEmail: email };
      const userAppointments = orders.find(query);
      const result = await userAppointments.toArray();
      res.send(result);
    });

    //Get today's appointment
    app.get("/todaysAppointment", async (req, res) => {
      const date = new Date(req.query.date);
      const query = { date: date.toLocaleDateString() };
      const userAppointments = orders.find(query);
      const result = await userAppointments.toArray();
      res.send(result);
    });

    // Get all Patients //user
    app.get("/patients", async (req, res) => {
      const query = users.find({});
      const result = await query.toArray();
      res.send(result);
    });

    // delete a patient
    app.delete("/patients/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await users.deleteOne(query);
      res.send(result);
    });

    // Get reviews
    app.get("/reviews", async (req, res) => {
      const query = reviews.find({});
      const result = await query.toArray();
      res.send(result);
    });
    // test

    // Get blogs
    app.get("/blogs", async (req, res) => {
      const query = blogs.find({});
      const result = await query.toArray();
      res.send(result);
    });

    // Make an Order
    app.post("/appointments", async (req, res) => {
      const order = req.body;
      const result = await orders.insertOne(order);
      res.send(result);
    });

    // post an user to database
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await users.insertOne(user);
      res.send(result);
    });

    // delete appointment
    app.delete("/appointment/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orders.deleteOne(query);
      res.send(result);
    });

    // Get userAppointments by email and date
    app.get("/userappointmentsED", verifyToken, async (req, res) => {
      const email = req.query.email;
      const date = req.query.date;
      const query = { patientEmail: email, date: date };
      const userSpecificAppointments = orders.find(query);
      const result = await userSpecificAppointments.toArray();
      res.send(result);
    });

    // make someone admin
    app.put("/users/makeAdmin", verifyToken, async (req, res) => {
      const user = req.body;
      const requester = req.decodedEmail;
      // filtering the requester
      if (requester) {
        const requesterAccount = await users.findOne({ email: requester });
        if (requesterAccount.role === "admin") {
          const filter = { email: user.email };
          const updateDoc = { $set: { role: "admin" } };
          const result = await users.updateOne(filter, updateDoc);
          res.send(result);
        }
      } else {
        res
          .status(403)
          .json({ message: "you do not have access to make someone admin!" });
      }
    });

    // Get admin
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await users.findOne(query);
      let isAdmin = false;
      if (user?.role === "admin") {
        isAdmin = true;
      }
      res.json({ admin: isAdmin });
    });

    // payment related routes
    // Get payment user info
    app.get("/appointment/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orders.findOne(query);
      res.send(result);
    });

    // payment post
    app.post("/create-payment-intent", async (req, res) => {
      const price = req.body;
      const amount = parseInt(price.price) * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: amount,
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // update appointments orders info to database
    app.put("/appointment/:id", async (req, res) => {
      const id = req.params.id;
      const payment = req.body;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          payment: payment,
        },
      };
      const result = await orders.updateOne(filter, updateDoc);
      res.send(result);
    });
  } finally {
    // client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("This is a server!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
