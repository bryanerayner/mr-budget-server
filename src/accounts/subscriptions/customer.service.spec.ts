import 'mocha';
import { expect, assert } from 'chai';
import realStripeApi from './stripe.api';
import 'bluebird';
import * as sinon from 'sinon';
const nodemock = require('nodemock');

import {
    CustomerService
} from './customer.service';

function getFirebaseOnceMock(snapshotValue: string) {
    return nodemock.mock('once')
    .takes('value')
    .returns(Promise.resolve({
        val(){
            return snapshotValue;
        }
    }));
}

function getFailingFirebaseOnceMock() {
    return nodemock.mock('once')
    .takes('value')
    .returns(Promise.resolve(null));
}

describe('CustomerService', () => {

    describe('#getCustomer', () => {

        it('should query the firebase database for users', async () => {


            const testCustomer = '324235';

            let firebaseDbMock = nodemock.mock('ref')
                .takes(`users/${testCustomer}/stripeCustomerId`)
                .returns(Promise.resolve(getFailingFirebaseOnceMock()))

            let firebaseMock: firebase.app.App = {
                database() {
                    return firebaseDbMock;
                }
            } as firebase.app.App;

            let service = new CustomerService(null,
                firebaseMock);

            let customer = await service.getCustomer(testCustomer);

            firebaseDbMock.assert();

            expect(customer).to.be.null;

        });


        it('should query Stripe for the customer stored in firebase', async () => {


            const testCustomer = '324235';

            let firebaseDbMock = nodemock.mock('ref')
                .takes(`users/${testCustomer}/stripeCustomerId`)
                .returns(Promise.resolve(getFirebaseOnceMock('235')))

            let firebaseMock: firebase.app.App = {
                database() {
                    return firebaseDbMock;
                }
            } as firebase.app.App;

            let service = new CustomerService(null,
                firebaseMock);

            let expectedReturn = {};

            let stripeCustomerSpy = sinon
                .stub(service, 'getStripeCustomer', function(){
                    return expectedReturn;
                });
            

            let customer = await service.getCustomer(testCustomer);

            firebaseDbMock.assert();

            sinon.assert.calledWith(stripeCustomerSpy, '235');

            expect(customer).to.equal(expectedReturn);

        });
    });
});