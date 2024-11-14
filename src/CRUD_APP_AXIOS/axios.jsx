import axios from 'axios';

// Setting up the base URL for Axios
const instance = axios.create({
  baseURL: 'http://localhost:3001' // Adjust this URL as needed
});

export default instance;
