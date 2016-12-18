import 'mocha';
import { expect, assert } from 'chai';
const nodemock = require('nodemock');

import {
    getApp
} from './firebase-app';

export var FirebaseIntegrationTest:boolean = true;


describe('Firebase Integration Test', () => {

    it('should retrieve keepalive value from the firebase database', async ()=>{

        let firebaseApp = getApp();

        let db = firebaseApp.database();

        let v = await db.ref('mr-budget-data').once('value');

        let data = v ? v.val() : null;

        expect(data.dates.yearFirstDeveloped).to.equal(2016);
    });

});