import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/auth'});


/**
 * Register New user
 * @param {{name:string, email: string, password: string}} data
 * 
 */


export const register = async (data) => {
    const res = await API.post('/register', data);
    return res.data;
};

/**
 * Login existing user
 * @param {{email;string, password:string}} data
 */

export const login = async (data) => {
    const res = await API.post('/login', data);
    return res.data;
};

//storing jwt token

export const setToken = (token) => {
        localStorage.setItem('authToken', token);
};


export const getToken = () => localStorage.getItem('authToken');