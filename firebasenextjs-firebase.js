"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.app = void 0;
exports.getApp = getApp;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
//@ts-ignore
const firebase_app_config_1 = require("/firebase-app-config");
const app = (0, app_1.initializeApp)(firebase_app_config_1.firebaseConfig);
exports.app = app;
const auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
function getApp() {
    if ((0, app_1.getApps)().length === 0) {
        return (0, app_1.initializeApp)(firebase_app_config_1.firebaseConfig);
    }
    else {
        return (0, app_1.getApps)()[0];
    }
}
