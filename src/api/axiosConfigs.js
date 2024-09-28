import axios from "axios"

const backendURL = `${window.location.origin}/api/v1`

export const api = axios.create({
    baseURL: backendURL,
    withCredentials: false,
})

const errorHandler = (error) => {
    const statusCode = error.response?.status
  
    if (statusCode && statusCode !== 401) {
      console.error(error)
    }
  
    return Promise.reject(error)
}

api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})