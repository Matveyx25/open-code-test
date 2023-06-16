import { CreateMessage, GetAllMessages, GetMessageByID, RemoveMessage } from "../actions/messages.actions";
import { messagesService } from '../../services/messages.service';


let initialState = {
		messages: null,
		currentMessage: null
};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetMessageByID:
					return {
						...state,
						currentMessage: action.currentMessage
					}
        case GetAllMessages:
					return {
						...state,
						messages: action.messages
					}
        case CreateMessage:
          return {
						...state,
						messages: [...state.messages, action.message]
					}
        case RemoveMessage:
					const remove_index = state.messages.findIndex(el => el.id == action.id)
					return {
							...state,
							messages: [
								...state.messages.splice(0, remove_index),
								...state.messages.splice(remove_index + 1)
							]
					}
        default:
            return state;
    }
}

const setCurrentMessage = (currentMessage) => ({type: GetMessageByID, currentMessage});
export const getMessageById = (id) => async (dispatch) => {
	let response = await messagesService.getMessageById(id);
	if(response.status === 200){
		dispatch(setCurrentMessage(response.data));
	}
}

const setAllMessages = (messages) => ({type: GetAllMessages, messages});
export const updateBankInfo = (filters) => async (dispatch) => {
	let response = await messagesService.getAllMessages(filters);
	if(response.status === 200){
		dispatch(setAllMessages(response.data));
	}
}

const setNewMessage = (message) => ({type: CreateMessage, message});
export const addMessage = (content) => async (dispatch) => {
	let response = await messagesService.createMessage(content);
	if(response.status === 204){
		dispatch(setNewMessage(content));
	}
}

const deleteMessage = (id) => ({type: RemoveMessage, id});
export const removeMessage = (id) => async (dispatch) => {
	let response = await messagesService.removeMessage(id);
	if(response.status === 204){
		dispatch(deleteMessage(id));
	}
}