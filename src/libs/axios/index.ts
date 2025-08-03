import Axios, { AxiosRequestConfig, AxiosError } from 'axios'
import Constants from 'expo-constants'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: Constants.expoConfig?.extra?.apiBaseUrl,
  timeout: 10000,
})

// Add request interceptor for authentication, logging, etc.
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data)

    // Handle common error cases
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login, clear tokens, etc.
      console.log('Unauthorized access - consider redirecting to login')
    }

    return Promise.reject(error)
  }
)

export const axios = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error - add cancel method to promise
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

export type ErrorType<Error = AxiosError> = Error
export type BodyType<BodyData = unknown> = BodyData
