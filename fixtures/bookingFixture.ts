let sharedContext: { bookingId?: number, bookingPayload?: any } = {};

export function setBookingData(bookingId: number, bookingPayload: any) {
    sharedContext.bookingId = bookingId;
    sharedContext.bookingPayload = bookingPayload;
}

export function getBookingData() {
    return sharedContext;
}