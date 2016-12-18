import './env';
import Hapi = require('hapi');
import plansRoute from './accounts/subscriptions/plans.route';
import customersRoute from './accounts/subscriptions/customers.route';

import stripeApi from './accounts/subscriptions/stripe.api';

import {
    getApp
} from './firebase/firebase-app';

// Create a server with a host and port
const server = new Hapi.Server();

const firebaseApp = getApp();

server.connection({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000    
});

plansRoute.setup(server, stripeApi);
customersRoute.setup(server, stripeApi, firebaseApp);


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
