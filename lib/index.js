"use strict";
require('./env');
var Hapi = require('hapi');
var plans_route_1 = require('./accounts/subscriptions/plans.route');
// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
});
plans_route_1["default"].setup(server);
// Start the server
server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
