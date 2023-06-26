import { instance } from "./axios.config";

export const manualsService = {
	getManualById(id, filters) {
		return instance.get(`/info/${id}/manuals`, {
		params: {
			limit: filters?.limit,
			offset: filters?.offset,
			code: filters?.code,
			description: filters?.description,
			deleted: filters?.deleted
		}
	})},
	createManual(id, data) {
		return instance.post(`/info/${id}/manuals`, data)
	},
	updateManual(id, data) {
		return instance.put(`/info/manuals/${id}`, data)
	},
	removeManual(id) {
		return instance.delete(`/info/manuals/${id}`)
	},
	recoveryManual(id) {
		return instance.patch(`/info/manuals/${id}`)
	}
}
