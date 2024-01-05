import axios from 'axios';

const BASE_URL = 'https://dms-thesis.up.railway.app'
//http://localhost:8080

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