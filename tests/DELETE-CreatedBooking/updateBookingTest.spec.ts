import { test, expect } from '@playwright/test';
import { generatePayload } from '../../utils/postPayloadGenerator';
import { updateAdditionalNeeds } from '../../utils/putPayloadGenerator';
import schema from '../../utils/postAPIschema.json';
import { generateAuthToken, getAuthToken } from '../../fixtures/tokenGeneratorFixture';

let bookingId: number;

test('DELETE-Created Booking-Test', async ({ request }) => {
    // Generate the initial payload
    const payload = generatePayload(schema);

    // Make the POST request to create the booking
    const postAPIResponse = await request.post('/booking', {
        data: payload
    });

    const postAPIResponseBody = await postAPIResponse.json();

    // Store the booking ID for the PUT request
    bookingId = postAPIResponseBody.bookingid;

    // Generate TOKEN
    await generateAuthToken(request); // Use the request context to generate the token
    const tokenNum = getAuthToken(); // Get the generated token
    console.log('Token Number: ', tokenNum);

    // Make the DELETE request to Delete the booking
    const deleteAPIResponse = await request.delete(`/booking/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${tokenNum}` // Set the token in the Cookie header
        }
    });

    const deleteAPIResponseBody = await deleteAPIResponse.text();

    // Validate the response
    expect(deleteAPIResponse.status()).toBe(201);
    expect(deleteAPIResponseBody).toContain('Created');

});