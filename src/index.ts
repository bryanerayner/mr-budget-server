import './env';
import Hapi = require('hapi');
import plansRoute from './accounts/subscriptions/plans.route';

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000    
});

plansRoute.setup(server);


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
