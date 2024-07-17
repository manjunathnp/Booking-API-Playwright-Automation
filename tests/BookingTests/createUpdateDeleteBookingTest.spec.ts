import { test, expect } from '@playwright/test';
import { generatePayload } from '../../utils/postPayloadGenerator';
import { updateAdditionalNeeds } from '../../utils/putPayloadGenerator';
import schema from '../../utils/postAPIschema.json';
import { generateAuthToken, getAuthToken } from '../../fixtures/tokenGeneratorFixture';

let bookingId: number;

test('E2E - Create Update Delete Booking-Test', async ({ request }) => {
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

    // Update only the additionalneeds field
    const updatedPayload = updateAdditionalNeeds(payload);

    // Make the PUT request to update the booking
    const putAPIResponse = await request.put(`/booking/${bookingId}`, {
        data: updatedPayload,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${tokenNum}` // Set the token in the Cookie header
        }
    });

    const putAPIResponseBody = await putAPIResponse.json();

    // Validate the response
    expect(putAPIResponseBody.additionalneeds).toBe(updatedPayload.additionalneeds);

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