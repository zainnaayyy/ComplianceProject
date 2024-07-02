// paymentController.js
const stripe = require('../util/StripeConfig');

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, payment_method } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method,
      confirmation_method: 'manual',
      confirm: true,
    });

    // Send the client secret to the client
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPaymentIntent,
};
