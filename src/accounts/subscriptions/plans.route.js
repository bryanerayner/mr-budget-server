"use strict";
var plan_service_1 = require("./plan.service");
var stripe_api_1 = require("./stripe.api");
var plansRoute = {
    setup: function (server) {
        var service = new plan_service_1.PlanService(stripe_api_1.default);
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