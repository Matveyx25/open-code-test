import { instance } from "./axios.config";

export const getManualById = (id) => (instance.get(`/info/${id}/manuals`))
export const createManual = (id, data) => (instance.post(`/info/${id}/manuals`, data))
export const updateManual = (id, data) => (instance.put(`/info/manuals/${id}`, data))
export const removeManual = (id) => (instance.delete(`/info/manuals/${id}`))
