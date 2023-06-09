import { CreateMessage, GetAllMessages, GetMessageByID, GetMessagesConfig, PushToFetchingList, RecoveryMessage, RemoveFromFetchingList, RemoveMessage, UpdateMessageName } from "../actions/messages.actions";
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
				case UpdateMessageName:
					const update_index = state.messages.findIndex(el => el.id == action.payload.id)
					return {
							...state,
							messages: [
								...state.messages.slice(0, update_index),
								{...state.messages[update_index], emessageName: action.payload.content},
								...state.messages.slice(update_index + 1)
							]
					}
				case RecoveryMessage:
					const recovery_index = state.messages.findIndex(el => el.id == action.id)
					return {
							...state,
							messages: [
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

const setUpdateMessageName = ({id, content}) => ({type: UpdateMessageName, payload: {id, content}});
export const updateMessageName = (id, name) => async (dispatch) => {
	let response = await messagesService.updateMessageName(id, name);
	if(response.status === 204){
		dispatch(setUpdateMessageName({id, content: name}));
		toast.success('Данные успешно изменены')
	}
}

const setNewMessage = (message) => ({type: CreateMessage, message});
export const addMessage = (content) => async (dispatch) => {
	let response = await messagesService.createMessage(content);
	if(response.status === 201){
		dispatch(setNewMessage(response.data));
		toast.success('Данные успешно добавлены')
	}
}

const setMessageFromServer = (message) => ({type: CreateMessage, message});
export const getMessageFromServer = () => async (dispatch) => {
	let response = await messagesService.createMessageFromServer();
	if(response.status === 201){
		dispatch(setMessageFromServer(response.data));
		toast.success('Данные успешно добавлены')
	}else if(response.status === 200){
		toast.warning('Актуальная информация уже загружена')
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
	let response = await messagesService.recoveryMessage(id);
	if(response.status === 204){
		dispatch(setRecoveryMessage(id));
		toast.success('Данные успешно удалены')
	}
}