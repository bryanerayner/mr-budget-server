///<reference path="./stripe.d.ts" />
///<reference path="../../mr-budget.d.ts" />
import * as Promise from 'bluebird';



export default class PlanService {

    constructor(protected stripe: stripe.StripeStatic) {

    }

    private getStripePlans(): Promise<stripe.IPlan[]> {
        return new Promise<stripe.IPlan[]>((resolve, reject)=>{
            this.stripe.plans.list({}, function(err, d){
                if (err){
                    reject(err);
                }
                resolve(d.data);
            });
        });
    }

    getAllPlans(): Promise<mrBudget.Plan[]> {
        return this.getStripePlans()
        .then((plans)=>{
            return this.augmentPlans(plans);
        });
    }

    augmentPlans(plans: stripe.IPlan[]) {
        return plans.map(p=>this.augmentPlan(p));
    }

    augmentPlan(plan: stripe.IPlan): mrBudget.Plan {
        return {
            name: plan.name,
            amount: plan.amount
        };
    }
}