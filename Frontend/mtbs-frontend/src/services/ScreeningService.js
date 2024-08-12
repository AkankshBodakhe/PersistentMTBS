import axios from "axios";

const REST_API_BASE_URL_SCREENING = 'http://localhost:8080/screenings';

export const listScreening = () => axios.get(REST_API_BASE_URL_SCREENING);

export const getScreening = (screeningID) => axios.get(REST_API_BASE_URL_SCREENING + '/' + screeningID);

export const addScreening = (screening) => axios.post(REST_API_BASE_URL_SCREENING,screening);

export const updateScreening = (screeningid,screening) => axios.put(REST_API_BASE_URL_SCREENING + '/' + screeningid,screening);

export const deleteScreening = (screeningid) => axios.delete(REST_API_BASE_URL_SCREENING + '/' + screeningid);