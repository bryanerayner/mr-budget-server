/// <reference path="stripe.d.ts" />
/// <reference path="../../firebase/firebase-admin.d.ts" />
import 'bluebird';
import * as firebase from 'firebase';
export declare const CUSTOMER_METADATA_FIREBASE_UID_KEY = "firebase_uid";
export interface CustomerResponse {
    customer: stripe.ICustomer;
}
/**
 * The customer service interacts with FireBase and the Stripe API to store
 * and retrieve information about the users' payment subscriptions.
 */
export declare class CustomerService {
    protected stripe: stripe.StripeStatic;
    protected firebaseApp: firebase.app.App;
    constructor(stripe: stripe.StripeStatic, firebaseApp: firebase.app.App);
    /**
     * Get a Stripe customer associated with the UID from firebase.
     */
    getCustomer(uid: string): Promise<stripe.ICustomer>;
    /**
     * Get the stripe customer
     */
    getStripeCustomer(id: string): Promise<stripe.ICustomer>;
    /**
     * Create a customer. This will create the customer via Stripe, and also
     * modify the Firebase information.
     * @param uid {string} The FireBase user uid to associate this customer object with
     */
    createCustomer(uid: string, email?: string): Promise<{
        customer: stripe.ICustomer;
        stripeCustomerId: string;
    }>;
}
