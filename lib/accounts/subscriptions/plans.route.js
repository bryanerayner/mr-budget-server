"use strict";
var plan_service_1 = require('./plan.service');
var stripe_api_1 = require('./stripe.api');
var plansRoute = {
    setup: function (server) {
        var service = new plan_service_1["default"](stripe_api_1["default"]);
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
exports.__esModule = true;
exports["default"] = plansRoute;
