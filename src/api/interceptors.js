export const setupInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      return Promise.reject(errorMessage);
    }
  );
};
