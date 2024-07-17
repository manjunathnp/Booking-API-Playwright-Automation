import { test, expect } from '@playwright/test';
import { generatePayload } from '../../utils/postPayloadGenerator';
import schema from '../../utils/postAPIschema.json';

 let bookingId: number;
// let bookingPayload: any;

test('POST API Request with Dynamic Payload', async ({ request }) => {
    // Generate the payload
    const payload = generatePayload(schema);

    // Make the POST request
    const postAPIResponse = await request.post('/booking', {
        data: payload
    });

    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);

    // Store the booking ID for GET request validation
    bookingId = postAPIResponseBody.bookingid;

    // Validate POST API Responses
    const validatePOSTAPIResponses = async() => {

        // Validate bookingId
        expect(bookingId).toBeDefined();
        expect(typeof bookingId).toBe('number');

        // Validate Status Code
        expect.soft(postAPIResponse.ok()).toBeTruthy();
        expect.soft(postAPIResponse.status()).toBe(200);

        // Validate JSON API Response
        expect.soft(postAPIResponseBody.booking).toHaveProperty('firstname', payload.firstname);
        expect.soft(postAPIResponseBody.booking).toHaveProperty('lastname', payload.lastname);

        // Validate Nested JSON Objects
        expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkin', payload.bookingdates.checkin);
        expect.soft(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkout', payload.bookingdates.checkout);
        expect.soft(postAPIResponseBody.booking).toHaveProperty('additionalneeds', payload.additionalneeds);
    }

    await validatePOSTAPIResponses();
});

//export { bookingId, bookingPayload };