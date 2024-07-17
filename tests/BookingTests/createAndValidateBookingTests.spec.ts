import { test, expect } from '@playwright/test';
import { generatePayload } from '../../utils/postPayloadGenerator';
import schema from '../../utils/postAPIschema.json';
import { setBookingData, getBookingData } from '../../fixtures/bookingFixture';

test.describe('Create and Validate Booking Test', () => {
    test('POST API Request with Dynamic Payload', async ({ request }) => {
        // Generate the payload
        const payload = generatePayload(schema);

        // Make the POST request
        const postAPIResponse = await request.post('/booking', {
            data: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const postAPIResponseBody = await postAPIResponse.json();
        console.log(postAPIResponseBody);

        // Store the booking ID and payload for GET request validation
        setBookingData(postAPIResponseBody.bookingid, payload);

        // Validate POST API Responses
        expect(postAPIResponse.ok()).toBeTruthy();
        expect(postAPIResponse.status()).toBe(200);
        expect(postAPIResponseBody.booking).toHaveProperty('firstname', payload.firstname);
        expect(postAPIResponseBody.booking).toHaveProperty('lastname', payload.lastname);
        expect(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkin', payload.bookingdates.checkin);
        expect(postAPIResponseBody.booking.bookingdates).toHaveProperty('checkout', payload.bookingdates.checkout);
        expect(postAPIResponseBody.booking).toHaveProperty('additionalneeds', payload.additionalneeds);
    });

    test('GET API Request to validate booking details', async ({ request }) => {
        const { bookingId, bookingPayload } = getBookingData();

        // Ensure bookingId is available
        if (!bookingId) {
            throw new Error('Booking ID not found. Ensure that the POST request test has been executed successfully.');
        }

        // Make the GET request
        const getAPIResponse = await request.get(`/booking/${bookingId}`, {
            headers: {
                'Accept': 'application/json'
            },
        });

        const getAPIResponseBody = await getAPIResponse.json();
        console.log(getAPIResponseBody);

        // Validate GET API Responses
        expect(getAPIResponse.ok()).toBeTruthy();
        expect(getAPIResponse.status()).toBe(200);
        expect(getAPIResponseBody).toHaveProperty('firstname', bookingPayload.firstname);
        expect(getAPIResponseBody).toHaveProperty('lastname', bookingPayload.lastname);
        expect(getAPIResponseBody.bookingdates).toHaveProperty('checkin', bookingPayload.bookingdates.checkin);
        expect(getAPIResponseBody.bookingdates).toHaveProperty('checkout', bookingPayload.bookingdates.checkout);
        expect(getAPIResponseBody).toHaveProperty('additionalneeds', bookingPayload.additionalneeds);
    });
});

