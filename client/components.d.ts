import "./ProfileButtonStyle.css";
import React from "react";
import { PopoverPosition } from "react-tiny-popover";
/**
 *
 * @param children - The component that should trigger the sign out.
 * @param persistRoute [Optional] - If true, the the user will be redirected to the same page after logging back in. Default is false.
 * @returns
 */
export declare function LogoutButton({ children, persistRoute }: {
    children: React.ReactNode;
    persistRoute?: boolean;
}): React.JSX.Element;
export declare function LoggedInContent({ children }: {
    children: React.ReactNode;
}): React.JSX.Element | null;
export declare function LoggedOutContent({ children }: {
    children: React.ReactNode;
}): React.JSX.Element | null;
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
export declare function GoogleSignInButton({ children, className, method }: {
    children?: React.ReactNode;
    className?: string;
    method?: "popup" | "redirect";
}): React.JSX.Element;
export declare function GithubSignInButton({ children, className }: {
    children?: React.ReactNode;
    className?: string;
}): React.JSX.Element;
export declare function EmailSignInButton({ children, email, password, setErrorMessage, className, setLoading }: {
    children: React.ReactNode;
    email: string;
    password: string;
    setErrorMessage: (msg: string) => any;
    className?: string;
    setLoading?: (loading: boolean) => any;
}): React.JSX.Element;
export declare function EmailSignUpButton({ children, email, password, setErrorMessage, className, setLoading }: {
    children: React.ReactNode;
    email: string;
    password: string;
    setErrorMessage: (msg: string) => void;
    className?: string;
    setLoading?: (loading: boolean) => void;
}): React.JSX.Element;
export declare function ProfileButton({ size, positions }: {
    size?: number;
    positions?: PopoverPosition[];
}): React.JSX.Element;
//# sourceMappingURL=components.d.ts.map