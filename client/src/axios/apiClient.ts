import apiConfig from './configApi';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    // withCredentials: true,

});

export default axiosClient;