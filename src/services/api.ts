import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  verifyToken: async (token: string) => {
    const response = await api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

// Students API
export const studentsAPI = {
  getAll: async () => {
    const response = await api.get('/students');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },
  
  create: async (studentData: any) => {
    const response = await api.post('/students', studentData);
    return response.data;
  },
  
  update: async (id: string, studentData: any) => {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  }
};

// Courses API
export const coursesAPI = {
  getAll: async () => {
    const response = await api.get('/courses');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  
  create: async (courseData: any) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },
  
  update: async (id: string, courseData: any) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  }
};

// Attendance API
export const attendanceAPI = {
  getByStudent: async (studentId: string) => {
    const response = await api.get(`/attendance/student/${studentId}`);
    return response.data;
  },
  
  getByCourse: async (courseId: string) => {
    const response = await api.get(`/attendance/course/${courseId}`);
    return response.data;
  },
  
  markAttendance: async (attendanceData: any) => {
    const response = await api.post('/attendance', attendanceData);
    return response.data;
  },
  
  generateQRCode: async (courseId: string) => {
    const response = await api.post(`/attendance/qr/${courseId}`);
    return response.data;
  }
};

// Resources API
export const resourcesAPI = {
  getAll: async () => {
    const response = await api.get('/resources');
    return response.data;
  },
  
  book: async (resourceId: string, bookingData: any) => {
    const response = await api.post(`/resources/${resourceId}/book`, bookingData);
    return response.data;
  },
  
  getBookings: async (userId: string) => {
    const response = await api.get(`/resources/bookings/${userId}`);
    return response.data;
  }
};

// Events API
export const eventsAPI = {
  getAll: async () => {
    const response = await api.get('/events');
    return response.data;
  },
  
  create: async (eventData: any) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },
  
  update: async (id: string, eventData: any) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  }
};

export default api;