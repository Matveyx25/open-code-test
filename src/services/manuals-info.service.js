import { instance } from "./axios.config";

export const getManualById = (id, filters) => (instance.get(`/info/${id}/manuals`, {
	params: {
		limit: filters?.limit,
		offset: filters?.offset,
		code: filters?.code,
		description: filters?.description,
		deleted: filters?.deleted
	}
}))
export const createManual = (id, data) => (instance.post(`/info/${id}/manuals`, data))
export const updateManual = (id, data) => (instance.put(`/info/manuals/${id}`, data))
export const removeManual = (id) => (instance.delete(`/info/manuals/${id}`))
