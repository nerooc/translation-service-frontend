import axios from 'axios';

// Use same port as app is running on if you want to use MSW
const API_URL = 'http://localhost:8080/api';

const instance = axios.create({baseURL: API_URL});

export default instance;
