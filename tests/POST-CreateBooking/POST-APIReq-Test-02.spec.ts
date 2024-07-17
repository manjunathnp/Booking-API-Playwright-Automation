// Load Playwright Module
import { test, expect } from '@playwright/test';
import * as bookingAPIRequestBody from '../../test-data/post-req-body.json';

// Write Test to Validate POST API Request 
test('Create POST API Request using Static JSON File', async ({ request }) => {
   // Create POST API Request 
   const postAPIResponse = await request.post(`/booking`, {
      data: bookingAPIRequestBody
    });

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    const validatePOSTAPIResponses = async() => {
        // Validate Status Code
    expect.soft(postAPIResponse.ok()).toBeTruthy();
    expect.soft(postAPIResponse.status()).toBe(200);

    // Validate JSON API Response
    expect.soft(postAPIResponseBody.booking).toHaveProperty('firstname', 'Testers');
    expect.soft(postAPIResponseBody.booking).toHaveProperty('lastname', 'Talk');

    // Validate Nest JSON Objects
    expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkin','2024-10-01');
    expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkout', '2024-10-10');
    }

    await validatePOSTAPIResponses();
});





