import axios from "axios";

const REST_API_BASE_URL_USER = 'http://localhost:8080/users';

export const listUser = () => axios.get(REST_API_BASE_URL_USER);

export const getUser = (userName) => axios.get(REST_API_BASE_URL_USER + '/' + userName);

export const getUserbyID = (userID) => axios.get(REST_API_BASE_URL_USER + '/id/' + userID);

export const addUser = (user) => axios.post(REST_API_BASE_URL_USER,user);

export const updateUser = (userid,user) => axios.put(REST_API_BASE_URL_USER + '/' + userid,user);

export const deleteUser = (userid) => axios.delete(REST_API_BASE_URL_USER + '/' + userid);

export const checkUsernameExists = (userName) => axios.get(REST_API_BASE_URL_USER + '/check-username/' + userName); 