"use strict";
var customer_service_1 = require("./customer.service");
var customersRoute = {
    setup: function (server, stripeApi, firebase) {
        var service = new customer_service_1.CustomerService(stripeApi, firebase);
        // Add the route
        server.route({
            method: 'POST',
            path: '/customers/{uid}',
            handler: function (request, reply) {
                reply(service.createCustomer(request.params['uid']));
            }
        });
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = customersRoute;
//# sourceMappingURL=customers.route.js.map