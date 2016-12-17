"use strict";
///<reference path="./stripe.d.ts" />
require("../../env");
var stripeInstance = require('stripe')(process.env.STRIPE_KEY);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = stripeInstance;
//# sourceMappingURL=stripe.api.js.map