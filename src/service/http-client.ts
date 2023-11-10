import axios from 'axios';

const Axios = axios.create({
  baseURL: "http://localhost:5025/api",
  timeout: 5000000,
});
// Change request data/error here
Axios.interceptors.request.use((config) => {
  // const token = authStore.getState().accessToken;
  const token = '';

  // @ts-ignore
  config.headers = token ? {
    ...config.headers,
    Authorization: `Token ${token ? token : ''}`,
  } : { ...config.headers, };
  return config;
});

// Change response data/error here
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === 'PICKBAZAR_ERROR.NOT_AUTHORIZED')
    ) {
    }
    return Promise.reject(error);
  }
);

const defaultHeader = {
  'Content-Type': 'application/json',
}


export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, { ...defaultHeader, ...options });
    return response.data;
  }

  static async postUpload<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, {
      ...defaultHeader,
      headers: {
        'Content-Type': "multipart/form-data",
      },
      ...options,
    });
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async patch<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.patch<T>(url, data, { ...defaultHeader, ...options });
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }
}
