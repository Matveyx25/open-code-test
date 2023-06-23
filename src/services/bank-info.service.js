import { instance } from "./axios.config";

export const bankInfoService = {
	getAllBankInfo(filters){
		return instance.get('/info', {
		params: {
			name: filters?.name, 
			deleted: filters?.deleted
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