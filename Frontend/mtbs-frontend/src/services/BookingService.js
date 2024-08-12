import axios from "axios";

const REST_API_BASE_URL_BOOKING = 'http://localhost:8080/bookings';

export const listBooking = () => axios.get(REST_API_BASE_URL_BOOKING);

export const getBooking = (bookingID) => axios.get(REST_API_BASE_URL_BOOKING + '/' + bookingID);

export const getBookingByUserID = (UserID) => axios.get(REST_API_BASE_URL_BOOKING + '/user/' + UserID);

export const addBooking = (booking) => axios.post(REST_API_BASE_URL_BOOKING,booking);

export const updateBooking = (bookingid,booking) => axios.put(REST_API_BASE_URL_BOOKING + '/' + bookingid,booking);

export const deleteBooking = (bookingid) => axios.delete(REST_API_BASE_URL_BOOKING + '/' + bookingid);