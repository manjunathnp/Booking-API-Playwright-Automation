import { APIRequestContext, request } from '@playwright/test';
import tokenReqBody from '../test-data/put-req-body.json';

// Shared context for storing the authentication token
let authToken: string | undefined;

// Function to generate the token
export async function generateAuthToken(apiRequestContext: APIRequestContext) {
    const tokenResponse = await apiRequestContext.post('/auth', {
        data: tokenReqBody
    });
    const tokenResponseBody = await tokenResponse.json();
    authToken = tokenResponseBody.token;
}

// Function to get the stored token
export function getAuthToken() {
    if (!authToken) {
        throw new Error('Auth token has not been generated. Call generateAuthToken() first.');
    }
    return authToken;
}

// Function to reset the token (optional, if needed for your tests)
export function resetAuthToken() {
    authToken = undefined;
}