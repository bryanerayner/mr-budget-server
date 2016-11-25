

declare namespace stripe {

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
        object:string;
        url:string;
        has_more:boolean;
        data: IPlan[];
    }

    export interface IPlansInterface {
        list(options: IListPlansOptions, callback: (err: any, plans: IPlansResponse) => void);
    }

    export interface StripeStatic {

        plans: IPlansInterface;
    }

    export default function construct(key: string): StripeStatic;

}