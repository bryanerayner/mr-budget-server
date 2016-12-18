"use strict";
var plan_service_1 = require("./plan.service");
var plansRoute = {
    setup: function (server, stripeApi) {
        var service = new plan_service_1.PlanService(stripeApi);
        // Add the route
        server.route({
            method: 'GET',
            path: '/plans',
            handler: function (request, reply) {
                reply(service.getAllPlans());
            }
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = plansRoute;
//# sourceMappingURL=plans.route.js.map