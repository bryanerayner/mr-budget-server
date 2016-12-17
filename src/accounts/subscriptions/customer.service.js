"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
///<reference path="./stripe.d.ts" />
///<reference path="../../firebase/firebase-admin.d.ts" />
require("bluebird");
exports.CUSTOMER_METADATA_FIREBASE_UID_KEY = 'firebase_uid';
/**
 * The customer service interacts with FireBase and the Stripe API to store
 * and retrieve information about the users' payment subscriptions.
 */
var CustomerService = (function () {
    function CustomerService(stripe, firebaseApp) {
        this.stripe = stripe;
        this.firebaseApp = firebaseApp;
    }
    /**
     * Get a Stripe customer associated with the UID from firebase.
     */
    CustomerService.prototype.getCustomer = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var firebaseApp, database, dbRef, snapshot, stripeCustomerId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firebaseApp = this.firebaseApp;
                        database = firebaseApp.database();
                        return [4 /*yield*/, database.ref("users/" + uid + "/stripeCustomerId")];
                    case 1:
                        dbRef = _a.sent();
                        return [4 /*yield*/, dbRef.once('value')];
                    case 2:
                        snapshot = _a.sent();
                        stripeCustomerId = snapshot ? snapshot.val() : null;
                        if (stripeCustomerId === null) {
                            return [2 /*return*/, null];
                        }
                        else {
                            return [2 /*return*/, this.getStripeCustomer(stripeCustomerId)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the stripe customer
     */
    CustomerService.prototype.getStripeCustomer = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var customer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            _this.stripe.customers.retrieve(id, function (err, customer) {
                                if (err) {
                                    reject(err);
                                }
                                resolve(customer);
                            });
                        })];
                    case 1:
                        customer = _a.sent();
                        return [2 /*return*/, customer];
                }
            });
        });
    };
    /**
     * Create a customer. This will create the customer via Stripe, and also modify the
     * Firebase information.
     * @param uid {string} The FireBase user uid to associate this customer object with
     */
    CustomerService.prototype.createCustomer = function (uid, email) {
        if (email === void 0) { email = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, firebaseApp, stripe, customer, database, stripeCustomerId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, firebaseApp = _a.firebaseApp, stripe = _a.stripe;
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                stripe.customers.create({
                                    description: "Stripe customer for Firebase user " + uid,
                                    email: email,
                                    metadata: (_a = {},
                                        _a[exports.CUSTOMER_METADATA_FIREBASE_UID_KEY] = uid,
                                        _a)
                                }, function (err, customer) {
                                    if (err) {
                                        reject(err);
                                    }
                                    resolve(customer);
                                });
                                var _a;
                            })];
                    case 1:
                        customer = _b.sent();
                        database = firebaseApp.database();
                        stripeCustomerId = customer.id;
                        return [4 /*yield*/, Promise.all([
                                database.ref("users/" + uid + "/stripeCustomerId").set(stripeCustomerId),
                                database.ref("users/" + uid + "/stripeCustomer").set(customer)
                            ])];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, {
                                customer: customer,
                                stripeCustomerId: stripeCustomerId
                            }];
                }
            });
        });
    };
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map