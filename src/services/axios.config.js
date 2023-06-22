import axios from 'axios'

export const instance = axios.create({
    baseURL: "http://178.170.193.201:8081",
    headers: {
        "API-KEY": ""
    }
})