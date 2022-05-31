import axios from 'axios';

const api = axios.create();

api.defaults.baseURL = process.env.API_BASE_URL || '/api/';

// REQUEST API CALL INTERCEPTOR
api.interceptors.request.use(
	async (config) => {
		return { ...config };
	},
	(error) => {
		Promise.reject(error);
	}
);

export default api;
