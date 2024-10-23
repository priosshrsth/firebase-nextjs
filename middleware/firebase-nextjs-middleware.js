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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = FirebaseNextJSMiddleware;
const server_1 = require("next/server");
// @ts-ignore
const check_user_1 = __importDefault(require("./check-user"));
const AUTH_PATHS = [
    "/login",
    "/register",
    "/forgot-password"
];
function FirebaseNextJSMiddleware(_a) {
    return __awaiter(this, arguments, void 0, function* ({ req, middleware: middlewareParams, options = {} }) {
        var _b, _c, _d;
        const path = req.nextUrl.pathname;
        const loggedIn = yield (0, check_user_1.default)();
        const middleware = middlewareParams !== null && middlewareParams !== void 0 ? middlewareParams : ((req) => { return server_1.NextResponse.next(); });
        // If user is already logged in, and tries an auth page
        // Redirect to the target page
        if (loggedIn && AUTH_PATHS.includes(path)) {
            const target = (_b = req.nextUrl.searchParams.get('target')) !== null && _b !== void 0 ? _b : "/";
            return server_1.NextResponse.redirect(new URL(target, req.nextUrl));
        }
        // Requesting an auth page.
        // These are special routes handled by FirebaseNextJS auth.
        if (AUTH_PATHS.includes(path)) {
            return server_1.NextResponse.next();
        }
        // If a regex rule is defined in allowRule, allow the path if it matches
        // Every other form of rule specification is ignored.
        if (options.allowRule != undefined) {
            const rule = new RegExp(options.allowRule);
            if (rule.test(path)) {
                return middleware(req);
            }
            else {
                if (loggedIn) {
                    return middleware(req);
                }
                return server_1.NextResponse.redirect(new URL('/login?target=' + path, req.nextUrl));
            }
        }
        const privatePaths = "privatePaths" in options ? (_c = options.privatePaths) !== null && _c !== void 0 ? _c : [] : [];
        const publicPaths = "publicPaths" in options ? (_d = options.publicPaths) !== null && _d !== void 0 ? _d : [] : [];
        const gateMode = !(privatePaths === null || privatePaths === void 0 ? void 0 : privatePaths.length) && (publicPaths === null || publicPaths === void 0 ? void 0 : publicPaths.length) ? 'denyByDefault' : 'allowByDefault';
        if (gateMode == "allowByDefault") {
            // Routes will be allowed by default
            // Routes in privatePaths will be denied for unauthenticated users
            if (privatePaths.includes(path) && !loggedIn) {
                return server_1.NextResponse.redirect(new URL('/login?target=' + path, req.nextUrl));
            }
            return middleware(req);
        }
        // Routes will be denied by default
        // Routes in publicPaths will be allowed for unauthenticated users
        if (publicPaths.includes(path) || loggedIn) {
            return middleware(req);
        }
        return server_1.NextResponse.redirect(new URL('/login?target=' + path, req.nextUrl));
    });
}
exports.config = {
    matcher: '/login',
};
