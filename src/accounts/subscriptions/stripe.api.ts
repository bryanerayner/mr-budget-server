///<reference path="./stripe.d.ts" />
import '../../env';
const stripeInstance:stripe.StripeStatic = require('stripe')(process.env.STRIPE_KEY);

export default stripeInstance;