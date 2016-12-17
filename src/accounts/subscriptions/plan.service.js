"use strict";
///<reference path="./stripe.d.ts" />
///<reference path="../../mr-budget.d.ts" />
var Promise = require("bluebird");
var PlanService = (function () {
    function PlanService(stripe) {
        this.stripe = stripe;
    }
    PlanService.prototype.getStripePlans = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.stripe.plans.list({}, function (err, d) {
                if (err) {
                    reject(err);
                }
                resolve(d.data);
            });
        });
    };
    PlanService.prototype.getAllPlans = function () {
        var _this = this;
        return this.getStripePlans()
            .then(function (plans) {
            return _this.augmentPlans(plans);
        });
    };
    PlanService.prototype.augmentPlans = function (plans) {
        var _this = this;
        return plans.map(function (p) { return _this.augmentPlan(p); });
    };
    PlanService.prototype.augmentPlan = function (plan) {
        return {
            name: plan.name,
            amount: plan.amount
        };
    };
    return PlanService;
}());
exports.PlanService = PlanService;
//# sourceMappingURL=plan.service.js.map