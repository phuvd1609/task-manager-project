import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const UserApi = {
  signUp: async (postData) => {
    try {
        const response = await api.post(`/signup`, postData)
        return response.data
    } catch (error) {
        console.log(error)
    }
  },

  logIn: async (postData) => {
    try {
        const response = await api.post(`/login`, postData)
        return response.data
    } catch (error) {
        console.log(error)
    }
  }
};

export default UserApi;