import Hapi = require('hapi');

import { 
    CustomerService
} from './customer.service';


const customersRoute = {
    setup(server: Hapi.Server, 
          stripeApi: stripe.StripeStatic,
          firebase: firebase.app.App){

        const service = new CustomerService(stripeApi,
                                            firebase);

        // Add the route
        server.route({
            method: 'POST',
            path: '/customers/{uid}', 
            handler: function (request, reply) {

                reply(service.createCustomer(request.params['uid']));
            }
        });
    }
}

export default customersRoute;