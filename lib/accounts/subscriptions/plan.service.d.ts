/// <reference path="../../../src/accounts/subscriptions/stripe.d.ts" />
/// <reference path="../../../src/mr-budget.d.ts" />
import * as Promise from 'bluebird';
export default class PlanService {
    protected stripe: stripe.StripeStatic;
    constructor(stripe: stripe.StripeStatic);
    private getStripePlans();
    getAllPlans(): Promise<mrBudget.Plan[]>;
    augmentPlans(plans: stripe.IPlan[]): mrBudget.Plan[];
    augmentPlan(plan: stripe.IPlan): mrBudget.Plan;
}
