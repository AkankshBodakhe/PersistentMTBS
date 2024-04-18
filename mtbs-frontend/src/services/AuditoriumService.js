import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/auditoriums';

export const listAuditorium = () => axios.get(REST_API_BASE_URL);

export const getAuditorium = (auditoriumID) => axios.get(REST_API_BASE_URL + '/' + auditoriumID);

export const addAuditorium = (auditorium) => axios.post(REST_API_BASE_URL,auditorium);

export const updateAuditorium = (auditoriumid,auditorium) => axios.put(REST_API_BASE_URL + '/' + auditoriumid,auditorium);

export const deleteAuditorium = (auditoriumid) => axios.delete(REST_API_BASE_URL + '/' + auditoriumid);