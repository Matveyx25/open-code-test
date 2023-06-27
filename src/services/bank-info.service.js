import { instance } from "./axios.config";

export const bankInfoService = {
	getAllBankInfo(filters, page = 1){
		return instance.get('/info', {
		params: {
			name: filters?.name, 
			deleted: filters?.deleted,
			page
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
	},
	recoveryBankInfo(id) {
		return instance.patch(`/info/${id}`)
	}
}