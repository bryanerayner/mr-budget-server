import Hapi = require('hapi');

import { 
    PlanService
} from './plan.service';
import stripeApi from './stripe.api';

const plansRoute = {
    setup(server: Hapi.Server){

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