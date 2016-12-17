import * as admin from 'firebase-admin';
import '../env';

const serviceAccount = require("path/to/serviceAccountKey.json");

let app = null;

export const getApp = () => {
    if (!app) {
        app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
    }
    return app;
}




