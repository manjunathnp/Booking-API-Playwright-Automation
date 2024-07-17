import faker from 'faker';

// Function to generate random additional needs
function generateAdditionalNeeds() {
    return faker.lorem.words(3); // Generate a proper additional needs description
}

// Function to update only the additionalneeds field
function updateAdditionalNeeds(payload: any): any {
    let updatedPayload = { ...payload }; // Create a shallow copy of the existing payload
    updatedPayload.additionalneeds = generateAdditionalNeeds();
    return updatedPayload;
}

export { updateAdditionalNeeds };