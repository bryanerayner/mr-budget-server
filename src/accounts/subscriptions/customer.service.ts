///<reference path="./stripe.d.ts" />
///<reference path="../../firebase/firebase-admin.d.ts" />
import 'bluebird';
import * as firebase from 'firebase';

export const CUSTOMER_METADATA_FIREBASE_UID_KEY = 'firebase_uid';

export interface CustomerResponse {
    customer: stripe.ICustomer;


}


/**
 * The customer service interacts with FireBase and the Stripe API to store
 * and retrieve information about the users' payment subscriptions.
 */
export class CustomerService {

    constructor(protected stripe: stripe.StripeStatic,
        protected firebaseApp: firebase.app.App) {

    }

    /**
     * Get a Stripe customer associated with the UID from firebase.
     */
    async getCustomer(uid: string): Promise<stripe.ICustomer> {
        let {
            firebaseApp
        } = this;

        let database = firebaseApp.database();

        

        let dbRef = await database.ref(`users/${uid}/stripeCustomerId`);
        let snapshot = await dbRef.once('value');

        let stripeCustomerId = snapshot ? snapshot.val() : null;

        if (stripeCustomerId === null) {
            return null;
        } else {
            return this.getStripeCustomer(stripeCustomerId);
        }
    }

    /**
     * Get the stripe customer
     */
    async getStripeCustomer(id: string) {
        let customer = await new Promise<stripe.ICustomer>((resolve, reject) => {
            this.stripe.customers.retrieve(id, (err, customer) => {
                if (err) {
                    reject(err);
                }
                resolve(customer);
            })
        });
        return customer;
    }

    /**
     * Create a customer. This will create the customer via Stripe, and also modify the 
     * Firebase information.
     * @param uid {string} The FireBase user uid to associate this customer object with 
     */
    async createCustomer(uid: string, email: string = null) {
        let {
            firebaseApp,
            stripe
        } = this;
        let customer = await new Promise<stripe.ICustomer>((resolve, reject) => {
            stripe.customers.create({
                description: `Stripe customer for Firebase user ${uid}`,
                email: email,
                metadata: {
                    [CUSTOMER_METADATA_FIREBASE_UID_KEY]: uid
                }
            }, (err, customer) => {
                if (err) {
                    reject(err);
                }
                resolve(customer);
            })
        });

        let database = firebaseApp.database();
        let stripeCustomerId = customer.id;

        await Promise.all([
            database.ref(`users/${uid}/stripeCustomerId`).set(stripeCustomerId),
            database.ref(`users/${uid}/stripeCustomer`).set(customer)
        ]
        );
        return {
            customer,
            stripeCustomerId
        };
    }

}