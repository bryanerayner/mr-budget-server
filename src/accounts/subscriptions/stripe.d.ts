

declare namespace stripe {

    export interface IDiscount {

    }

    export interface ICard {

    }

    export interface IBitcoinReceiver {

    }

    export interface ICustomer {
        /**
         * ID of the customer
         */
        id: string;

        /**
         * string, is always "customer"
         */
        object: "customer";
        /**
         * Current balance, if any, being stored on the customer’s account. If negative, the customer has credit to apply to the next invoice. If positive, the customer has an amount owed that will be added to the next invoice. The balance does not refer to any unpaid invoices; it solely takes into account amounts that have yet to be successfully applied to any invoice. This balance is only taken into account for recurring billing purposes (i.e., subscriptions, invoices, invoice items).
         */
        account_balance: number;

        /**
         * The customer’s VAT identification number.
         */
        business_vat_id: string;

        created: number;

        /**
         * The currency the customer can be charged in for recurring billing purposes.
         */
        currency: string;

        /**
         * ID of the default source attached to this customer.
         */
        default_source: string;

        /**
         * Whether or not the latest charge for the customer’s latest invoice has failed
         */
        delinquent: boolean;


        description: string;

        /**
         * Describes the current discount active on the customer, if there is one.
         */
        discount: IDiscount;

        email: string;

        livemode: boolean;

        /**
         * A set of key/value pairs that you can attach to a customer object. It can be useful for storing additional information about the customer in a structured format.
         */
        metadata: { [key: string]: string; };

        /**
         * Shipping information associated with the customer.
         */
        shipping: {
            address: {
                city: string;
                country: string;
                line1: string;
                line2: string;
                postal_code: string;
                state: string;
            };
            /**
             * Customer name
             */
            name: string;

            /**
             * Customer phone (including extension)
             */
            phone: string;
        };

        /**
         * The customer’s payment sources, if any
         */
        sources: {
            object: 'list',

            /**
             * The list contains all payment sources that have been attached to the customer. These may be Cards or BitcoinReceivers
             */
            data: Array<ICard | IBitcoinReceiver>,

            has_more: boolean;
            /**
             * The total number of items available.
             This value is not included by default, but you can request it by specifying ?include[]=total_count
             */
            total_count: number;
            /**
             * The URL where this list can be accessed
             */
            url: string;
        }

        /**
         * The customer’s current subscriptions, if any
         */
        subscriptions: {
            object: 'list',

            /**
             * The list contains all payment sources that have been attached to the customer. These may be Cards or BitcoinReceivers
             */
            data: Array<ISubscription>,

            has_more: boolean;
            /**
             * The total number of items available.
             This value is not included by default, but you can request it by specifying ?include[]=total_count
             */
            total_count: number;
            /**
             * The URL where this list can be accessed
             */
            url: string;

        }

    }

    /**
     * Subscriptions allow you to charge a customer's card on a recurring basis. A subscription ties a customer to a particular plan you've created.
     */
    export interface ISubscription {

        id: string;

        object: 'subscription';

        application_fee_percent: number;

        cancel_at_period_end: boolean;

        canceled_at: number;

        created: number;

        current_period_end: number;

        current_period_start: number;

        customer: string;

        discount: IDiscount;

        ended_at: number;

        livemode: boolean;

        metadata: { [key: string]: string; };

        plan: IPlan;

        quantity: number;

        start: number;

        status: 'trialing', 'active', 'past_due', 'canceled', 'unpaid'

        tax_percent: number;

        trial_end: number;

        trial_start: number;
    }

    export interface ICreatedOptions {
        /**
         * Return values where the created field is after this timestamp.
         */
        gt?: string;

        /**
         * Return values where the created field is after or equal to this timestamp.
         */
        gte?: string;

        /**
         * Return values where the created field is before this timestamp.
         */
        lt?: string;

        /**
         * Return values where the created field is before or equal to this timestamp.
         */
        lte?: string;
    }

    export interface IListPlansOptions {

        /**
         * A filter on the list based on the object created field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with options
         */
        created?: ICreatedOptions | string;

        /**
         * A cursor for use in pagination. 
         * ending_before is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_bar, your subsequent call can include ending_before=obj_bar in order to fetch the previous page of the list.
         */
        ending_before?: string;

        /**
         * Optinal, default is 10
         */
        limit?: number;

        /** 
         * A cursor for use in pagination. starting_after is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include starting_after=obj_foo in order to fetch the next page of the list.
         */
        starting_after?: string;
    }

    interface IPlan {
        id: string;
        object: 'plan';
        amount: number;
        created: number;
        currency: string;
        interval: string;
        interval_count: number;
        livemode: boolean;
        metadata: any;
        name: string;
        statement_descriptor: string;
        trial_period_days: number;
    }
    /**
     * A object with a data property that contains an array of up to limit plans, starting after plan starting_after. Each entry in the array is a separate plan object. If no more plans are available, the resulting array will be empty. This request should never throw an error.
     * You can optionally request that the response include the total count of all plans that match your filters. To do so, specify include[]=total_count in your request.
     */
    export interface IPlansResponse {
        object: string;
        url: string;
        has_more: boolean;
        data: IPlan[];
    }

    export interface IPlansInterface {
        list(options: IListPlansOptions, callback: (err: any, plans: IPlansResponse) => void);
    }

    export interface ICreateCustomerOptions {
        account_balance?: number;

        email?: string;
        description?: string;
        metadata?: { [key: string]: string; }
    }

    export interface ICustomersInterface {
        create(options: ICreateCustomerOptions, callback: (err: any, customer: ICustomer) => void);

        retrieve(id: string, callback: (err: any, customer: ICustomer) => void);
    }

    export interface StripeStatic {

        plans: IPlansInterface;

        customers: ICustomersInterface;
    }

    export default function construct(key: string): StripeStatic;

}