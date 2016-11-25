"use strict";
///<reference path="./stripe.d.ts" />
require('../../env');
var stripeInstance = require('stripe')(process.env.STRIPE_KEY);
exports.__esModule = true;
exports["default"] = stripeInstance;
