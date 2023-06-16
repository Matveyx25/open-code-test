import { instance } from "./axios.config";

export const bankInfoService = {
	getAllBankInfo(filters){
		return instance.get('/info', {
		params: {
			limit: filters?.limit, 
			offset: filters?.offset, 
			emessage_name: filters?.emessage_name, 
			date_start: filters?.date_start, 
			date_end: filters?.date_end, 
		}
	})},
	createBankInfo(data){
		return instance.post(`/info`, data)
	},
	updateBankInfo(id, data){
		return instance.put(`/info/${id}`, data)
	},
	removeBankInfo(id){
		return instance.delete(`/info/${id}`)
	}
}