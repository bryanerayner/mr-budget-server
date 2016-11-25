"use strict";
require('./env');
var Hapi = require('hapi');
// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
});
// Add the route
server.route({
    method: 'GET',
    path: '/plans',
    handler: function (request, reply) {
        return reply('hello world');
    }
});
// Start the server
server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
