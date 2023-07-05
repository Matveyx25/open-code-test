import { CreateMessage, GetAllMessages, GetMessageByID, GetMessagesConfig, PushToFetchingList, RecoveryMessage, RemoveFromFetchingList, RemoveMessage, UpdateMessage, UpdateMessageName } from "../actions/messages.actions";
import { messagesService } from '../../services/messages.service';
import { toast } from "react-toastify";


let initialState = {
		messages: null,
		currentMessage: null,
		fetchingList: [],
		pages: 0
};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetMessageByID:
					return {
						...state,
						currentMessage: action.currentMessage
					}
				case GetMessagesConfig:
					return {
								...state,
								pages: action.pages
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
        case UpdateMessage:
					return state;
				case UpdateMessageName:
					const update_index = state.messages.findIndex(el => el.id == action.payload.id)
					return {
							...state,
							banksInfo: [
								...state.messages.slice(0, update_index),
								{id: action.payload.id, name: action.payload.name, ...state.messages[update_index]},
								...state.messages.slice(update_index + 1)
							]
					}
				case RecoveryMessage:
					const recovery_index = state.messages.findIndex(el => el.id == action.id)
					return {
							...state,
							banksInfo: [
								...state.messages.slice(0, recovery_index),
								...state.messages.slice(recovery_index + 1)
							]
					}
				case PushToFetchingList: 
					return {...state, fetchingList: [...state.fetchingList, action.fetching]}
				case RemoveFromFetchingList: 
					const remove_fetching_index = state.fetchingList.findIndex(el => el === action.fetching)
					return {...state, fetchingList: [
						...state.fetchingList.slice(0, remove_fetching_index), 
						...state.fetchingList.slice(remove_fetching_index + 1)]}
        default:
          return state;
    }
}

const pushToFetchingList = (fetching) => ({type: PushToFetchingList, fetching});
const removeFromFetchingList = (fetching) => ({type: RemoveFromFetchingList, fetching});

const setMessagesConfig = (pages) => ({type: GetMessagesConfig, pages});
const setCurrentMessage = (currentMessage) => ({type: GetMessageByID, currentMessage});

export const getMessageById = (id, filters, page) => async (dispatch) => {
	dispatch(pushToFetchingList('get-current-message'))
	let response = await messagesService.getMessageById(id, filters, page);
	if(response.status === 200){
		dispatch(setCurrentMessage(response.data.items));
		dispatch(setMessagesConfig(response.data.config.countOfPages));
		dispatch(removeFromFetchingList('get-current-message'))
	}else{
		dispatch(removeFromFetchingList('get-current-message'))
	}
}

const setAllMessages = (messages) => ({type: GetAllMessages, messages});
export const getAllMessages = (filters, page) => async (dispatch) => {
	dispatch(pushToFetchingList('get-all-messages'))
	let response = await messagesService.getAllMessages(filters, page);
	if(response.status === 200){
		dispatch(setAllMessages(response.data.items));
		dispatch(setMessagesConfig(response.data.config.countOfPages));
		dispatch(removeFromFetchingList('get-all-messages'))
	}else{
		dispatch(removeFromFetchingList('get-all-messages'))
	}
}

const setUpdateMessage = ({id, content}) => ({type: UpdateMessage, payload: {id, content}});
export const updateMessage = (id, content) => async (dispatch) => {
	let response = await messagesService.updateMessage(id, content);
	if(response.status === 204){
		dispatch(setUpdateMessage({id, content}));
		toast.success('Данные успешно изменены')
	}
}

const setUpdateMessageName = ({id, name}) => ({type: UpdateMessageName, payload: {id, name}});
export const updateMessageName = (id, name) => async (dispatch) => {
	let response = await messagesService.updateMessage(id, name);
	if(response.status === 204){
		dispatch(setUpdateMessageName({id, name}));
		toast.success('Данные успешно изменены')
	}
}

const setNewMessage = (message) => ({type: CreateMessage, message});
export const addMessage = (content) => async (dispatch) => {
	let response = await messagesService.createMessage(content);
	if(response.status === 204){
		dispatch(setNewMessage(content));
		toast.success('Данные успешно добавлены')
	}
}

const deleteMessage = (id) => ({type: RemoveMessage, id});
export const removeMessage = (id) => async (dispatch) => {
	let response = await messagesService.removeMessage(id);
	if(response.status === 204){
		dispatch(deleteMessage(id));
		toast.success('Данные успешно удалены')
	}
}

const setRecoveryMessage = (id) => ({type: RecoveryMessage, id});
export const recoveryMessage = (id) => async (dispatch) => {
	let response = await messagesService.removeMessage(id);
	if(response.status === 204){
		dispatch(setRecoveryMessage(id));
		toast.success('Данные успешно удалены')
	}
}