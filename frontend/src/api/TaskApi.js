import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const TaskApi = {
  getAllTask: async () => {
    try {
      const response = await api.get('/get-all-task');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  getTaskByEmail: async (email) => {
    try {
      const response = await api.get(`/get-task/${email}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  createTask: async (data) => {
    try {
        const response = await api.post('/create-task', data)
        return response.data
    } catch (error) {
        console.log(error)
    }
  },

  completeTask: async (taskId) => {
    try {
        const response = await api.put(`/complete-task/${taskId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
  },

  deleteTask: async (taskId) => {
    try {
        const response = await api.delete(`/delete-task/${taskId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
  },
  editTask: async (taskId, data) => {
    try {
        const response = await api.put(`/update-task/${taskId}`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
  },
};

export default TaskApi;