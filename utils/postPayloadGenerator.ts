import faker from 'faker';

function generateRandomData(type: string) {
    switch(type) {
        case 'string':
            return faker.name.firstName(); // Generate a proper first name or last name
        case 'number':
            return faker.datatype.number({ min: 50, max: 500 }); // Proper number range for totalprice
        case 'boolean':
            return faker.datatype.boolean();
        case 'date':
            return faker.date.between('2024-07-20', '2024-08-20').toISOString().split('T')[0];
        case 'additionalneeds':
            return faker.lorem.words(3); // Generate proper additional needs description
        default:
            return null;
    }
}

function generatePayload(schema: any): any {
    let payload: any = {};
    for (let key in schema) {
        if (typeof schema[key] === 'object') {
            payload[key] = generatePayload(schema[key]);
        } else {
            payload[key] = generateRandomData(schema[key]);
        }
    }
    // Ensure checkout date is after checkin date
    if (payload.bookingdates) {
        const checkinDate = new Date(payload.bookingdates.checkin);
        const checkoutDate = new Date(checkinDate.getTime() + (Math.random() * 10 + 1) * 24 * 60 * 60 * 1000);
        payload.bookingdates.checkout = checkoutDate.toISOString().split('T')[0];
    }
    return payload;
}

export { generatePayload };