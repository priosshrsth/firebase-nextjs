"use server";
import { cookies } from 'next/headers'
import * as admin from 'firebase-admin';
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import fs from 'fs';

async function getServiceAccountCreds() {
    if (process.env.FIREBASENEXTJS_SERVICE_ACCOUNT_CREDENTIALS) {
        return JSON.parse(process.env.FIREBASENEXTJS_SERVICE_ACCOUNT_CREDENTIALS)
    }
    else {
        try {
            const serverConfigFile = fs.readFileSync('firebase-service-account.json', 'utf8')
            return JSON.parse(serverConfigFile)
        }
        catch (error) {
            console.error("Error while reading service account creds", error)
            return null
        }
    }
}

export async function getAppSS() {
    if (admin.apps.length === 0) {
        return admin.initializeApp({
            credential: admin.credential.cert(await getServiceAccountCreds())
        });
    }

    return admin.app()
}

export async function getUserSS() {
    const app = await getAppSS()
    const cookieStore = await cookies()
    const token = cookieStore.get('firebase_nextjs_token')
    if (token === undefined) {
        return null
    }
    try {
        const user: DecodedIdToken = await getAuth(app)
            .verifySessionCookie(token.value, true)
        return user;
    } catch (error) {
        console.error('Error while verifying token', error);
        return null
    }
}