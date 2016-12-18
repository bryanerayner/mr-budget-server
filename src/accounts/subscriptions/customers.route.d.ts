import Hapi = require('hapi');
declare const customersRoute: {
    setup(server: Hapi.Server, stripeApi: stripe.StripeStatic, firebase: firebase.app.App): void;
};
export default customersRoute;
