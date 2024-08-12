import axios from "axios";

const REST_API_BASE_URL_THEATRE = 'http://localhost:8080/theatres';

export const listTheatre = () => axios.get(REST_API_BASE_URL_THEATRE);

export const getTheatre = (theatreID) => axios.get(REST_API_BASE_URL_THEATRE + '/' + theatreID);

export const addTheatre = (theatre) => axios.post(REST_API_BASE_URL_THEATRE,theatre);

export const updateTheatre = (theatreid,theatre) => axios.put(REST_API_BASE_URL_THEATRE + '/' + theatreid,theatre);

export const deleteTheatre = (theatreid) => axios.delete(REST_API_BASE_URL_THEATRE + '/' + theatreid);