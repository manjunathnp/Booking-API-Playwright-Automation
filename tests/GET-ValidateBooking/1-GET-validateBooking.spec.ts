import { test, expect } from '@playwright/test';
import { generatePayload } from '../../utils/postPayloadGenerator';
import schema from '../../utils/postAPIschema.json';

 let bookingId: number;
 let firstName: string;
// let bookingPayload: any;

test('GET-Validate Booking with Valid Booking ID-Test', async ({ request }) => {
    // Generate the payload
    const payload = generatePayload(schema);

    // Make the POST request
    const postAPIResponse = await request.post('/booking', {
        data: payload
    });

    const postAPIResponseBody = await postAPIResponse.json();

    // Store the validation attributes for GET request validation
    bookingId = postAPIResponseBody.bookingid;
    firstName = postAPIResponseBody.firstName;


    // Make the GET request - that includes bookingID and Query Parameters
    const getAPIResponse = await request.get(`/booking/${bookingId}`, {
        params: {
            'firstName': firstName
        }
    });

    const getAPIResponseBody = await getAPIResponse.json();
    console.log('GET-API RESPONSE: \n',getAPIResponseBody);

    // Validate GET API Responses
    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponseBody).toHaveProperty('firstname', getAPIResponseBody.firstname);
    expect(getAPIResponseBody).toHaveProperty('lastname', getAPIResponseBody.lastname);
    expect(getAPIResponseBody.bookingdates).toHaveProperty('checkin', getAPIResponseBody.bookingdates.checkin);
    expect(getAPIResponseBody.bookingdates).toHaveProperty('checkout', getAPIResponseBody.bookingdates.checkout);
    expect(getAPIResponseBody).toHaveProperty('additionalneeds', getAPIResponseBody.additionalneeds);
});