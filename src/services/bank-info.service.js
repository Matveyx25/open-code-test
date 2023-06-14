import { instance } from "./axios.config";

export const getAllBankInfo = () => (instance.get('/info'))
export const createBankInfo = (data) => (instance.post(`/info`, data))
export const updateBankInfo = (id, data) => (instance.put(`/info/${id}`, data))
export const removeBankInfo = (id) => (instance.delete(`/info/${id}`))