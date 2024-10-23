"use strict";
"use server";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppSS = getAppSS;
exports.getUserSS = getUserSS;
const headers_1 = require("next/headers");
const admin = __importStar(require("firebase-admin"));
const auth_1 = require("firebase-admin/auth");
const fs_1 = __importDefault(require("fs"));
function getServiceAccountCreds() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.FIREBASENEXTJS_SERVICE_ACCOUNT_CREDENTIALS) {
            return JSON.parse(process.env.FIREBASENEXTJS_SERVICE_ACCOUNT_CREDENTIALS);
        }
        else {
            try {
                const serverConfigFile = fs_1.default.readFileSync('firebase-service-account.json', 'utf8');
                return JSON.parse(serverConfigFile);
            }
            catch (error) {
                console.error("Error while reading service account creds", error);
                return null;
            }
        }
    });
}
function getAppSS() {
    return __awaiter(this, void 0, void 0, function* () {
        if (admin.apps.length === 0) {
            return admin.initializeApp({
                credential: admin.credential.cert(yield getServiceAccountCreds())
            });
        }
        return admin.app();
    });
}
function getUserSS() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield getAppSS();
        const cookieStore = yield (0, headers_1.cookies)();
        const token = cookieStore.get('firebase_nextjs_token');
        if (token === undefined) {
            return null;
        }
        try {
            const user = yield (0, auth_1.getAuth)(app)
                .verifySessionCookie(token.value, true);
            return user;
        }
        catch (error) {
            console.error('Error while verifying token', error);
            return null;
        }
    });
}
