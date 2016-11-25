import 'mocha';
import { expect, assert } from 'chai';
import realStripeApi from './stripe.api';
const nodemock = require('nodemock');

import {
    PlanService
} from './plan.service';

export var PlanServiceTest:boolean = true;


describe('PlanService', () => {

    describe('#getAllPlans', () => {

        let service: PlanService;

        let stripeMock: stripe.StripeStatic;

        let plansMock: stripe.IPlansInterface;

        let plansResponse: stripe.IPlansResponse;

        let plan: stripe.IPlan;

        beforeEach(function () {

            plan = {
                id:'234235',
                object:'plan',
                amount:5,
                created:3234,
                currency:'USD',
                interval:'',
                interval_count:4,
                livemode:true,
                metadata:{},
                name:'basic',
                statement_descriptor:'',
                trial_period_days:4
            };

            plansResponse = {
                object: '',
                url: '',
                has_more: false,
                data: [
                    plan
                ]
            };

            plansMock = nodemock
                .mock('list')
                .takes({}, function(){})
                .calls(1, [null, plansResponse]);

            stripeMock = {
                plans: plansMock
            };

            service = new PlanService(stripeMock);
        });

        it('should return the plans from the server', (done)=>{
            service.getAllPlans().then((plans)=>{
                let firstPlan = plans[0];

                expect(firstPlan).to.deep.equal({
                    name: 'basic',
                    amount: 5
                }, 'The plan must deeply equal the other');
                done();
            });
        });
    });
});


describe('PlanService Integration Test', ()=>{

    it('should retrieve at least one plan from Stripe', (done)=>{

        let planService = new PlanService(realStripeApi);

        planService.getAllPlans().then(p=>{
            expect(p.length).to.be.above(0, 'Should be at least one plan');
            done();
        });
    })
});