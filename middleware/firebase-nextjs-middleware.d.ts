import { NextRequest, NextResponse } from 'next/server';
export type IFirebaseNextJSMiddlewareOptions = {
    allowRule: string;
} & ({
    publicPaths: string[];
} | {
    privatePaths: string[];
});
interface Params {
    req: NextRequest;
    middleware?: (req: NextRequest, res?: NextResponse) => Promise<unknown>;
    options?: Partial<IFirebaseNextJSMiddlewareOptions>;
}
export default function FirebaseNextJSMiddleware({ req, middleware: middlewareParams, options }: Params): Promise<unknown>;
export declare const config: {
    matcher: string;
};
export {};
//# sourceMappingURL=firebase-nextjs-middleware.d.ts.map