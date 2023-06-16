import { instance } from "./axios.config";

export const messagesService = {
	getAllMessages() {
		return instance.get('/emessages')
	},
	getMessageById(id) {
		return instance.get(`/emessages/${id}`)
	},
	createMessage(data) {
		return instance.post(`/emessages`, data, {headers: {'Content-Type': 'application/xml'}})
	},
	removeMessage(id) {
		return instance.delete(`/emessages/${id}`)
	}
}