import * as admin from 'firebase-admin';
import { DecodedIdToken } from "firebase-admin/auth";
export declare function getAppSS(): Promise<admin.app.App>;
export declare function getUserSS(): Promise<DecodedIdToken | null>;
//# sourceMappingURL=auth.d.ts.map