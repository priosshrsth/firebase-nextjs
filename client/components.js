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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doSignInWithGoogle = void 0;
exports.LogoutButton = LogoutButton;
exports.LoggedInContent = LoggedInContent;
exports.LoggedOutContent = LoggedOutContent;
exports.GoogleSignInButton = GoogleSignInButton;
exports.GithubSignInButton = GithubSignInButton;
exports.EmailSignInButton = EmailSignInButton;
exports.EmailSignUpButton = EmailSignUpButton;
exports.ProfileButton = ProfileButton;
require("./ProfileButtonStyle.css");
const auth_actions_1 = require("../auth-actions");
const auth_1 = require("firebase/auth");
const firebasenextjs_firebase_1 = require("../firebasenextjs-firebase");
const auth_2 = require("./auth");
const getFirebaseErrors_1 = require("./getFirebaseErrors");
const react_1 = __importStar(require("react"));
const react_tiny_popover_1 = require("react-tiny-popover");
const doSignInWithGoogle = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new auth_1.GoogleAuthProvider();
    const resp = yield (0, auth_1.signInWithPopup)(firebasenextjs_firebase_1.auth, provider);
    if (resp) {
        callback();
    }
});
exports.doSignInWithGoogle = doSignInWithGoogle;
/**
 *
 * @param children - The component that should trigger the sign out.
 * @param persistRoute [Optional] - If true, the the user will be redirected to the same page after logging back in. Default is false.
 * @returns
 */
function LogoutButton({ children, persistRoute }) {
    function signOutAction() {
        (0, auth_actions_1.doSignOut)({ persist: persistRoute !== null && persistRoute !== void 0 ? persistRoute : false });
    }
    return react_1.default.createElement("div", { onClick: signOutAction }, children);
}
function LoggedInContent({ children }) {
    const { currentUser } = (0, auth_2.getUserCS)();
    return currentUser ? react_1.default.createElement(react_1.default.Fragment, null, children) : null;
}
function LoggedOutContent({ children }) {
    const { currentUser } = (0, auth_2.getUserCS)();
    return currentUser ? null : react_1.default.createElement(react_1.default.Fragment, null, children);
}
/**
 *
 * !! IMPORTANT !!
 * If using redirect method, additional configuration is required. Read examples below for more details.
 * @param children - The component that should trigger the sign in with Google. If not provided, a default button will be shown.
 * @param className - The class name of the button
 * @param method - The method of sign in. Can be "popup" or "redirect". Default is "popup". Read examples for more details.
 *
 * @returns  A component that triggers the sign in with Google.
 *
 * @example
 * // 1. Using default UI and popup
 * // -------------------------------------
 * <GoogleSignInButton />
 *
 * @example
 * // 2. Custom UI and popup
 * // -------------------------------------
 * <GoogleSignInButton>
 *    <button className="bg-blue-500 text-white rounded-lg p-2">Sign in with Google</button>
 * </GoogleSignInButton>
 *
 * @example
 * // 3. Using redirect
 * // -------------------------------------
 *
 * <GoogleSignInButton method="redirect" />
 *
 * // SETUP (Required only for redirect method):
 * // 1. Go to Firebase Console > Authentication > Settings > Authorized Domains
 * // 2. Add your domain. (Add "localhost" to test locally).
 * // 3. Open "firebase-app-config.json" and copy the authDomain value. (Ex: "your-app.firebaseapp.com")
 * // 4. Edit nextjs.config.mjs and add the rewrite rules as shown below.
 *
 * // nextjs.config.mjs
 * const nextConfig = {
 *   async rewrites() {
 *       return [
 *           {
 *               source: '/__/auth/:path*',
 *               destination: 'https://your-app.firebaseapp.com/__/auth/:path*',
 *           },
 *       ];
 *   }
 *};
 *
 * export default nextConfig;
 *
 * // 5. Edit firebase-app-config.json and change the authDomain value to your app's domain.
 * // Example: "authDomain": "your-website.com"
 * // If locally: "authDomain": "localhost:3000"
 *
 * // 6. Enforce https. (Required)
 * // For localhost, this can be done by changing "next dev" in package.json to "next dev --experimental-https"
 *
 * // If you come across any issue, please file the issue on GitHub.
 * @link https://github.com/NirmalScaria/firebase-nextjs
 *
 */
function GoogleSignInButton({ children, className, method = "popup" }) {
    const doSignInWithGoogle = () => __awaiter(this, void 0, void 0, function* () {
        const provider = new auth_1.GoogleAuthProvider();
        const resp = yield (0, auth_1.signInWithPopup)(firebasenextjs_firebase_1.auth, provider);
        if (resp) {
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }
    });
    const doSignInWithGoogleRedirect = () => __awaiter(this, void 0, void 0, function* () {
        const provider = new auth_1.GoogleAuthProvider();
        (0, auth_1.signInWithRedirect)(firebasenextjs_firebase_1.auth, provider);
    });
    function GoogleLogo(_a) {
        var { height = 24, width = 24 } = _a, props = __rest(_a, ["height", "width"]);
        return react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: height, viewBox: "0 0 24 24", width: width },
            react_1.default.createElement("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
            react_1.default.createElement("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
            react_1.default.createElement("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
            react_1.default.createElement("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" }),
            react_1.default.createElement("path", { d: "M1 1h22v22H1z", fill: "none" }));
    }
    return react_1.default.createElement("div", { onClick: method == "popup" ? doSignInWithGoogle : doSignInWithGoogleRedirect, className: className }, children !== null && children !== void 0 ? children : react_1.default.createElement("button", { className: "w-full bg-white text-gray-500 font-medium rounded-lg p-2 text-sm border shadow-sm hover:shadow-md transition-all flex flex-row items-center justify-center gap-2" },
        react_1.default.createElement(GoogleLogo, { height: 18, width: 18 }),
        "Sign in with Google"));
}
function GithubSignInButton({ children, className }) {
    const doSignInWithGithub = () => __awaiter(this, void 0, void 0, function* () {
        const provider = new auth_1.GithubAuthProvider();
        console.log("Provider : ", provider);
        const resp = yield (0, auth_1.signInWithPopup)(firebasenextjs_firebase_1.auth, provider);
        console.log("Resp : ", resp);
        if (resp) {
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }
    });
    function GithubLogo(_a) {
        var { height = 24, width = 24 } = _a, props = __rest(_a, ["height", "width"]);
        return react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: width, height: height, viewBox: "0 0 48 48" },
            react_1.default.createElement("linearGradient", { id: "rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1", x1: "4", x2: "44", y1: "23.508", y2: "23.508", gradientUnits: "userSpaceOnUse" },
                react_1.default.createElement("stop", { offset: "0", "stop-color": "#4c4c4c" }),
                react_1.default.createElement("stop", { offset: "1", "stop-color": "#343434" })),
            react_1.default.createElement("path", { fill: "url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)", d: "M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36\tC38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z" }),
            react_1.default.createElement("path", { d: "M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177\tc0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116\tc-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021\tc-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584\tC27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589\tc-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021\tl-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115\tc-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89\tc0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137\tc-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518\tc-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028\tc-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255\tc0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732\tc0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0\tc0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44\tc2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z", opacity: ".05" }),
            react_1.default.createElement("path", { d: "M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052\tc5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147\tc0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032\tc0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024\tc-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61\tc-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215\tc-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116\tc-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795\tc0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256\tc-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665\tc-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022\tc-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002\tc0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712\tc0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177\tc0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003\tC30.231,42.997,30.812,42.793,30.781,42.797z", opacity: ".07" }),
            react_1.default.createElement("path", { fill: "#fff", d: "M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309\tc0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047\tc-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652\tc-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25\ts-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704\tc0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394\tc-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583\tc-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75\tc0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583\tc0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013\tC19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804\tc0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328\tc0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482\tc-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15\tC13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393\tc0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297\tc0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289\tC17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281\tc0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z" }));
    }
    return react_1.default.createElement("div", { onClick: doSignInWithGithub, className: className }, children !== null && children !== void 0 ? children : react_1.default.createElement("button", { className: "w-full bg-white text-gray-500 font-medium rounded-lg p-2 text-sm border shadow-sm hover:shadow-md transition-all flex flex-row items-center justify-center gap-2" },
        react_1.default.createElement(GithubLogo, { height: 18, width: 18 }),
        "Sign in with Github"));
}
function EmailSignInButton({ children, email, password, setErrorMessage, className, setLoading }) {
    function doSignInWithEmailAndPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            if (setLoading)
                setLoading(true);
            try {
                const userCredential = yield (0, auth_1.signInWithEmailAndPassword)(firebasenextjs_firebase_1.auth, email, password);
                if (userCredential) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500);
                }
                if (setLoading)
                    setLoading(false);
            }
            catch (error) {
                setErrorMessage((0, getFirebaseErrors_1.decodeFirebaseError)({ errorCode: error.code }));
                if (setLoading)
                    setLoading(false);
            }
        });
    }
    return react_1.default.createElement("div", { onClick: doSignInWithEmailAndPassword, className: className }, children);
}
function EmailSignUpButton({ children, email, password, setErrorMessage, className, setLoading }) {
    function doCreateUserWithEmailAndPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            if (setLoading)
                setLoading(true);
            try {
                const userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(firebasenextjs_firebase_1.auth, email, password);
                if (userCredential) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2500);
                }
                if (setLoading)
                    setLoading(false);
            }
            catch (error) {
                setErrorMessage((0, getFirebaseErrors_1.decodeFirebaseError)({ errorCode: error.code }));
                if (setLoading)
                    setLoading(false);
            }
        });
    }
    return react_1.default.createElement("div", { onClick: doCreateUserWithEmailAndPassword, className: className }, children);
}
function ProfileButton({ size = 30, positions = ["bottom", "left", "right", "top"] }) {
    const [isPopoverOpen, setIsPopoverOpen] = (0, react_1.useState)(false);
    const { currentUser } = (0, auth_2.getUserCS)();
    if (!currentUser)
        return react_1.default.createElement("div", null);
    return react_1.default.createElement(react_tiny_popover_1.Popover, { isOpen: isPopoverOpen, positions: positions, onClickOutside: () => setIsPopoverOpen(false), content: react_1.default.createElement(ProfilePopup, { user: currentUser }), containerStyle: { zIndex: "999" } },
        react_1.default.createElement("div", { onClick: () => setIsPopoverOpen(!isPopoverOpen) },
            react_1.default.createElement(ProfileButtonTrigger, { user: currentUser, size: size })));
}
function LogoutLogo(_a) {
    var { height = 20, width = 20 } = _a, props = __rest(_a, ["height", "width"]);
    return react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", height: height, width: width, id: "logout" },
        react_1.default.createElement("g", null,
            react_1.default.createElement("path", { d: "M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zm13.82 5.42-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z" })));
}
function ProfileButtonTrigger({ user, size }) {
    var _a, _b;
    const imageUrl = (_a = user === null || user === void 0 ? void 0 : user.photoURL) !== null && _a !== void 0 ? _a : "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + ((_b = user === null || user === void 0 ? void 0 : user.displayName) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.email);
    return (react_1.default.createElement("img", { src: imageUrl, alt: "profile", height: size, width: size, className: "rounded-full", id: "profileImage", style: { cursor: "pointer" } }));
}
;
function ProfilePopup({ user }) {
    var _a, _b;
    const imageUrl = (_a = user === null || user === void 0 ? void 0 : user.photoURL) !== null && _a !== void 0 ? _a : "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + ((_b = user === null || user === void 0 ? void 0 : user.displayName) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.email);
    const popupStyle = {
        width: "calc(-40px + min(100vw, 370px))",
        backgroundColor: '#fff',
        border: '1px solid #00000022',
        borderRadius: 8,
        color: "#000",
        padding: 0,
        paddingTop: 10,
        margin: 10,
    };
    const profilePopupImageStyle = {
        borderRadius: 9999,
        height: 30,
        width: 30,
        margin: 5,
        marginLeft: 13,
        marginTop: 8,
    };
    return react_1.default.createElement("div", { style: popupStyle },
        react_1.default.createElement("div", { style: { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 } },
            react_1.default.createElement("img", { src: imageUrl, alt: "profile", height: 30, width: 30, style: profilePopupImageStyle }),
            react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column" } },
                (user === null || user === void 0 ? void 0 : user.displayName) && react_1.default.createElement("div", { style: {
                        fontSize: 15,
                        fontWeight: 500,
                        marginLeft: 8,
                        marginRight: 13,
                        marginBottom: 0,
                    } }, user === null || user === void 0 ? void 0 : user.displayName),
                react_1.default.createElement("div", { style: { fontSize: 14, color: "#00000088", marginLeft: 8, marginRight: 13 } }, user === null || user === void 0 ? void 0 : user.email))),
        react_1.default.createElement("hr", null),
        react_1.default.createElement(LogoutButton, null,
            react_1.default.createElement("div", { className: "profileLogout" },
                react_1.default.createElement(LogoutLogo, null),
                "Log Out")));
}
;
