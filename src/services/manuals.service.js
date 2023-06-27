import { instance } from "./axios.config";

export const manualsService = {
	getManualById(id, filters, page = 1) {
		return instance.get(`/info/${id}/manuals`, {
		params: {
			code: filters?.code,
			description: filters?.description,
			deleted: filters?.deleted,
			page
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
