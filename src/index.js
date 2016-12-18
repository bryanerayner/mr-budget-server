"use strict";
require("./env");
var Hapi = require("hapi");
var plans_route_1 = require("./accounts/subscriptions/plans.route");
var customers_route_1 = require("./accounts/subscriptions/customers.route");
var stripe_api_1 = require("./accounts/subscriptions/stripe.api");
var firebase_app_1 = require("./firebase/firebase-app");
// Create a server with a host and port
var server = new Hapi.Server();
var firebaseApp = firebase_app_1.getApp();
server.connection({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
});
plans_route_1.default.setup(server, stripe_api_1.default);
customers_route_1.default.setup(server, stripe_api_1.default, firebaseApp);
// Start the server
server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
//# sourceMappingURL=index.js.map