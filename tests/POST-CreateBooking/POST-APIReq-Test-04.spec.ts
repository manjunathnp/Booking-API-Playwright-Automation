// Load Playwright Module
import { test, expect } from '@playwright/test';
import * as bookingAPIRequestBody from '../../test-data/post-dynamic-req-body.json';
import { stringFormat } from '../../utils/common';

// Write Test to Validate POST API Request 
test('Create POST API Request using Dynamic JSON File', async ({ request }) => {

    const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody), "Tester", "Testing", "Test");

   // Create POST API Request 
   const postAPIResponse = await request.post(`/booking`, {
      data: JSON.parse(dynamicRequestBody)
    });

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    const validatePOSTAPIResponses = async() => {
        // Validate Status Code
    expect.soft(postAPIResponse.ok()).toBeTruthy();
    expect.soft(postAPIResponse.status()).toBe(200);

    // Validate JSON API Response
    expect.soft(postAPIResponseBody.booking).toHaveProperty('firstname', 'Tester');
    expect.soft(postAPIResponseBody.booking).toHaveProperty('lastname', 'Testing');

    // Validate Nest JSON Objects
    expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkin','2024-10-01');
    expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkout', '2024-10-10');
    expect.soft(postAPIResponseBody.booking).toHaveProperty('additionalneeds', 'Test');
    }

    await validatePOSTAPIResponses();
});





