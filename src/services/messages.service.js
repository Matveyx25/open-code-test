import { instance } from "./axios.config";

export const messagesService = {
	getAllMessages(filters, page) {
		return instance.get('/emessages', {
			params: {
				emessage_name: filters?.emessage_name,
				deleted: filters?.deleted,
				page
			}
		})
	},
	getMessageById(id, filters, page) {
		return instance.get(`/emessages/${id}/bics`, {
			params: {
				participant_type: filters?.participant_type,
				name_p: filters?.name_p,
				bic: filters?.bic,
				page
			}
		})
	},
	createMessage(data) {
		return instance.post(`/emessages/xml`, data, {headers: {'Content-Type': 'application/xml'}})
	},
	updateMessageName(id, name) {
		return instance.put(`/emessages/${id}`, {name})
	},
	updateMessage(id, data) {
		return instance.put(`/emessages/${id}/xml`, data, {headers: {'Content-Type': 'application/xml'}})
	},
	removeMessage(id) {
		return instance.delete(`/emessages/${id}`)
	},
	recoveryMessage(id) {
		return instance.patch(`/emessages/${id}`)
	}
}