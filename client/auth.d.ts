import React from "react";
import { User } from "firebase/auth";
type FirebaseNextJSContextType = {
    userLoggedIn: boolean;
    isEmailUser: boolean;
    currentUser: User | null;
};
export declare function getUserCS(): FirebaseNextJSContextType;
interface Props {
    children: React.ReactNode;
    renderEmptyBodyWhileLoading?: boolean;
}
export declare function FirebaseNextJSProvider({ children, renderEmptyBodyWhileLoading }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=auth.d.ts.map