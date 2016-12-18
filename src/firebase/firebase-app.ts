import * as admin from 'firebase-admin';
import '../env';

const serviceAccount = require('./key.json');

export const getApp = () : firebase.app.App => {
    let app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    return app as any;
}




