import { instance } from "./axios.config";

export const getAllMessages = () => (instance.get('/emessages'))
export const getMessageById = (id) => (instance.get(`/emessages/${id}`))
export const createMessage = (data) => (instance.post(`/emessages`, data, {headers: {'Content-Type': 'application/xml'}}))
export const removeMessage = (id) => (instance.delete(`/emessages/${id}`))