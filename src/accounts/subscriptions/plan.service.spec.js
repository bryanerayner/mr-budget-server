"use strict";
require('mocha');
var chai_1 = require('chai');
var stripe_api_1 = require('./stripe.api');
var nodemock = require('nodemock');
var plan_service_1 = require('./plan.service');
exports.PlanServiceTest = true;
describe('PlanService', function () {
    describe('#getAllPlans', function () {
        var service;
        var stripeMock;
        var plansMock;
        var plansResponse;
        var plan;
        beforeEach(function () {
            plan = {
                id: '234235',
                object: 'plan',
                amount: 5,
                created: 3234,
                currency: 'USD',
                interval: '',
                interval_count: 4,
                livemode: true,
                metadata: {},
                name: 'basic',
                statement_descriptor: '',
                trial_period_days: 4
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
                .takes({}, function () { })
                .calls(1, [null, plansResponse]);
            stripeMock = {
                plans: plansMock
            };
            service = new plan_service_1.PlanService(stripeMock);
        });
        it('should return the plans from the server', function (done) {
            service.getAllPlans().then(function (plans) {
                var firstPlan = plans[0];
                chai_1.expect(firstPlan).to.deep.equal({
                    name: 'basic',
                    amount: 5
                }, 'The plan must deeply equal the other');
                done();
            });
        });
    });
});
describe('PlanService Integration Test', function () {
    it('should retrieve at least one plan from Stripe', function (done) {
        var planService = new plan_service_1.PlanService(stripe_api_1.default);
        planService.getAllPlans().then(function (p) {
            chai_1.expect(p.length).to.be.above(0, 'Should be at least one plan');
            done();
        });
    });
});
