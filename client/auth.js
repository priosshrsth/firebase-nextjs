"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUserCS = getUserCS;
exports.FirebaseNextJSProvider = FirebaseNextJSProvider;
const react_1 = __importStar(require("react"));
const firebasenextjs_firebase_1 = require("../firebasenextjs-firebase");
const auth_1 = require("firebase/auth");
const getToken_1 = require("../server/getToken");
const FirebaseNextJSContext = react_1.default.createContext({
    userLoggedIn: false,
    isEmailUser: false,
    currentUser: null,
});
function getUserCS() {
    return (0, react_1.useContext)(FirebaseNextJSContext);
}
function FirebaseNextJSProvider({ children, renderEmptyBodyWhileLoading }) {
    const [currentUser, setCurrentUser] = (0, react_1.useState)(null);
    const [userLoggedIn, setUserLoggedIn] = (0, react_1.useState)(false);
    const [isEmailUser, setIsEmailUser] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const unsubscribe = (0, auth_1.onAuthStateChanged)(firebasenextjs_firebase_1.auth, initializeUser);
        return unsubscribe;
    }, []);
    function initializeUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user) {
                const isEmail = user.providerData.some((provider) => provider.providerId === "password");
                setIsEmailUser(isEmail);
                user.getIdToken(true).then(function (idToken) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const sessionToken = yield (0, getToken_1.getToken)({ idToken });
                        document.cookie = `firebase_nextjs_token=${sessionToken}; expires=${new Date(Date.now() + 3600 * 1000 * 24 * 14).toUTCString()}; path=/;`;
                    });
                }).catch(function (error) {
                    return __awaiter(this, void 0, void 0, function* () {
                        console.error(error);
                        console.error("FAILED TO GET ID TOKEN");
                    });
                });
                setCurrentUser(Object.assign({}, user));
                setUserLoggedIn(true);
            }
            else {
                setCurrentUser(null);
                setUserLoggedIn(false);
                document.cookie = "firebase_nextjs_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
            }
            setLoading(false);
        });
    }
    const value = {
        userLoggedIn,
        isEmailUser,
        currentUser
    };
    return (react_1.default.createElement(FirebaseNextJSContext.Provider, { value: value }, (renderEmptyBodyWhileLoading && loading) ? react_1.default.createElement("body", null) : children));
}
