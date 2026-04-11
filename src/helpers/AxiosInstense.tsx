import axios from "axios";

export const AxiosInstense = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})