import axios from 'axios';

axios.defaults.withCredentials = true;

// You can also add interceptors for requests or responses here if needed
// For example, to attach the token to every request header for authorization

axios.interceptors.request.use(
  (config) => {
    const token = 'YOUR_TOKEN'; // Retrieve the token from your context or state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default axios;
