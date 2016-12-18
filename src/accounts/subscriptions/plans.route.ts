import Hapi = require('hapi');

import { 
    PlanService
} from './plan.service';


const plansRoute = {
    setup(server: Hapi.Server, stripeApi: stripe.StripeStatic){

        const service = new PlanService(stripeApi);

        // Add the route
        server.route({
            method: 'GET',
            path: '/plans', 
            handler: function (request, reply) {
                reply(service.getAllPlans());
            }
        });
    }
}

export default plansRoute;