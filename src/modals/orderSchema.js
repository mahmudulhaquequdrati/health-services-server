const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    patientName: String,
  patientEmail: String,
  address: String,
  serviceName: String,
  time: String,
  price: String,
  date: String,
  payment: {
    transaction: String,
    last4: String
  }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order;