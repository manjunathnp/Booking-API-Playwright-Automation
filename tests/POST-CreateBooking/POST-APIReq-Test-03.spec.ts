// Load Playwright Module
import { test, expect } from '@playwright/test';
import * as bookingAPIRequestBody from '../../test-data/post-req-body.json';
import { faker } from '@faker-js/faker'; 
import { DateTime } from 'luxon';

// Write Test to Validate POST API Request 
test('Create POST API Request using Dynamic Request Body', async ({ request }) => {
    // Generate Faker Data
    const firstName = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalPriceVal = faker.number.int(1000);

    const checkInDate = DateTime.now().toFormat('yyyy-MM-dd');
    const checkOutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd');

   // Create POST API Request 
   const postAPIResponse = await request.post(`/booking`, {
    data: {
        "firstname": firstName,
        "lastname": lastname,
        "totalprice": totalPriceVal,
        "depositpaid": true,
        "bookingdates": {
            "checkin": checkInDate,
            "checkout": checkOutDate
        },
        "additionalneeds": "super bowls"
      },
    });

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    const validatePOSTAPIResponses = async() => {
        // Validate Status Code
    expect.soft(postAPIResponse.ok()).toBeTruthy();
    expect.soft(postAPIResponse.status()).toBe(200);

    // Validate JSON API Response
    expect.soft(postAPIResponseBody.booking).toHaveProperty('firstname', firstName);
    expect.soft(postAPIResponseBody.booking).toHaveProperty('lastname', lastname);

    // Validate Nest JSON Objects
    expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkin',checkInDate);
    expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkout', checkOutDate);
    }

    await validatePOSTAPIResponses();
});





