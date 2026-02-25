import axios from 'axios';

const axiosAdmin = axios.create();

// Attach access token ke setiap request
axiosAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response — jika 401, coba refresh token
axiosAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika 401 dan belum pernah retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Coba refresh token via cookie
        const res = await axios.get('/api/auth/token');
        const newAccessToken = res.data.accessToken;

        // Simpan token baru
        localStorage.setItem('accessToken', newAccessToken);

        // Ulangi request asal dengan token baru
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAdmin(originalRequest);
      } catch {
        // Refresh gagal — logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('loginTime');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosAdmin;
