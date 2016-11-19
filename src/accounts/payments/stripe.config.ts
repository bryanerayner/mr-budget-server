let stripe = require('stripe');

export const stripeConfig = {
    secret: ''
};

export function getStripeApi() {
    return stripe(stripeConfig.secret);
}

