import axios from 'axios';

const BASE_URL = 'http://localhost:8080'
// https://dms-thesis.up.railway.app/
export default axios.create({
    baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    withCredentials: true
})