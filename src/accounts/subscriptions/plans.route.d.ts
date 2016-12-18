import Hapi = require('hapi');
declare const plansRoute: {
    setup(server: Hapi.Server, stripeApi: stripe.StripeStatic): void;
};
export default plansRoute;
