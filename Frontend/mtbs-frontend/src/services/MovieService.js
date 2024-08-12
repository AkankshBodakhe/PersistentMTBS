import axios from "axios";

const REST_API_BASE_URL_MOVIE = 'http://localhost:8080/movies';

export const listMovie = () => axios.get(REST_API_BASE_URL_MOVIE);

export const getMovie = (movieID) => axios.get(REST_API_BASE_URL_MOVIE + '/' + movieID);

export const addMovie = (movie) => axios.post(REST_API_BASE_URL_MOVIE,movie);

export const updateMovie = (movieid,movie) => axios.put(REST_API_BASE_URL_MOVIE + '/' + movieid,movie);

export const deleteMovie = (movieid) => axios.delete(REST_API_BASE_URL_MOVIE + '/' + movieid);