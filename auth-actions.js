"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doSendEmailVerification = exports.doPasswordChange = exports.doPasswordReset = exports.doSignInWithGoogle = exports.doSignInWithEmailAndPassword = exports.doCreateUserWithEmailAndPassword = void 0;
exports.doSignOut = doSignOut;
const firebasenextjs_firebase_1 = require("./firebasenextjs-firebase");
const auth_1 = require("firebase/auth");
const doCreateUserWithEmailAndPassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, auth_1.createUserWithEmailAndPassword)(firebasenextjs_firebase_1.auth, email, password);
});
exports.doCreateUserWithEmailAndPassword = doCreateUserWithEmailAndPassword;
const doSignInWithEmailAndPassword = (email, password) => {
    return (0, auth_1.signInWithEmailAndPassword)(firebasenextjs_firebase_1.auth, email, password);
};
exports.doSignInWithEmailAndPassword = doSignInWithEmailAndPassword;
const doSignInWithGoogle = () => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new auth_1.GoogleAuthProvider();
    const result = yield (0, auth_1.signInWithPopup)(firebasenextjs_firebase_1.auth, provider);
    return result;
});
exports.doSignInWithGoogle = doSignInWithGoogle;
function doSignOut(_a) {
    return __awaiter(this, arguments, void 0, function* ({ persist }) {
        yield firebasenextjs_firebase_1.auth.signOut();
        if (persist) {
            window.location.reload();
        }
        else {
            window.location.href = "/";
        }
    });
}
const doPasswordReset = (email) => {
    return (0, auth_1.sendPasswordResetEmail)(firebasenextjs_firebase_1.auth, email);
};
exports.doPasswordReset = doPasswordReset;
const doPasswordChange = (password) => {
    return (0, auth_1.updatePassword)(firebasenextjs_firebase_1.auth.currentUser, password);
};
exports.doPasswordChange = doPasswordChange;
const doSendEmailVerification = () => {
    return (0, auth_1.sendEmailVerification)(firebasenextjs_firebase_1.auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};
exports.doSendEmailVerification = doSendEmailVerification;
