import { instance } from "./axios.config";

export const getAllBankInfo = (filters) => (instance.get('/info', {
	params: {
		limit: filters?.limit, 
		offset: filters?.offset, 
		emessage_name: filters?.emessage_name, 
		date_start: filters?.date_start, 
		date_end: filters?.date_end, 
	}
}))
export const createBankInfo = (data) => (instance.post(`/info`, data))
export const updateBankInfo = (id, data) => (instance.put(`/info/${id}`, data))
export const removeBankInfo = (id) => (instance.delete(`/info/${id}`))