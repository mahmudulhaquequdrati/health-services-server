const stripe = require("stripe")(process.env.STRIPE_SECRET);
// 
const stripeOrderDocuments = async (req , res) =>{
    try {
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
      } catch (error) {
        console.log(error)
      }
}

module.exports = {
    stripeOrderDocuments
}