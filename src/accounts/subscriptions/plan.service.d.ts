/// <reference path="stripe.d.ts" />
/// <reference path="../../mr-budget.d.ts" />
/// <reference types="bluebird" />
import * as Promise from 'bluebird';
export declare class PlanService {
    protected stripe: stripe.StripeStatic;
    constructor(stripe: stripe.StripeStatic);
    private getStripePlans();
    getAllPlans(): Promise<mrBudget.Plan[]>;
    augmentPlans(plans: stripe.IPlan[]): mrBudget.Plan[];
    augmentPlan(plan: stripe.IPlan): mrBudget.Plan;
}
