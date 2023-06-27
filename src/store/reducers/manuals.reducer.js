import { CreateManual, GetManualById, GetManualConfig, PushToFetchingList, RecoveryManual, RemoveFromFetchingList, RemoveManual, UpdateManual } from '../actions/manuals.actions';
import { manualsService } from '../../services/manuals.service';
import { toast } from 'react-toastify';

let initialState = {
		currentManual: null,
		fetchingList: [],
		pages: 0
};

export const manualsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetManualById:
					return {
						...state,
						currentManual: action.currentManual
					}
        case GetManualConfig:
					return {
						...state,
						pages: action.pages
					}
        case UpdateManual:
					const update_index = state.currentManual.findIndex(el => el.id === action.payload.id)		
					const updateObj = {
						id: action.payload.id, 
						code: action.payload.content.code || state.currentManual[update_index].code, 
						description: action.payload.content.description || state.currentManual[update_index].description}
					return {
							...state,
							currentManual: [
								...state.currentManual.slice(0, update_index),
								updateObj,
								...state.currentManual.slice(update_index + 1)
							]
					}
        case CreateManual:
          return {...state, currentManual: [...state.currentManual, action.manual]}
        case RemoveManual:
					const remove_index = state.currentManual.findIndex(el => el.id === action.id)
					return {
							...state,
							currentManual: [
								...state.currentManual.slice(0, remove_index),
								...state.currentManual.slice(remove_index + 1)
							]
					}
        case RecoveryManual:
					const recovery_index = state.currentManual.findIndex(el => el.id === action.id)
					return {
							...state,
							currentManual: [
								...state.currentManual.slice(0, recovery_index),
								...state.currentManual.slice(recovery_index + 1)
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

const setManualConfig = (pages) => ({type: GetManualConfig, pages});
const setCurrentManual = (currentManual) => ({type: GetManualById, currentManual});
export const getManualById = (id, filters, page) => async (dispatch) => {
	dispatch(pushToFetchingList('get-manual-by-id'))
	let response = await manualsService.getManualById(id, filters, page);
	if(response.status === 200){
		dispatch(setCurrentManual(response.data.items));
		dispatch(setManualConfig(response.data.config.countOfPages));
		dispatch(removeFromFetchingList('get-manual-by-id'))
	}else{
		dispatch(removeFromFetchingList('get-manual-by-id'))
	}
}

const setUpdateManual = ({id, content}) => ({type: UpdateManual, payload: {id, content}});
export const updateManual = (id, content) => async (dispatch) => {
	let response = await manualsService.updateManual(id, content);
	if(response.status === 204){
		dispatch(setUpdateManual({id, content}));
		toast.success('Данные успешно изменены')
	}
}

const setNewManual = (manual) => ({type: CreateManual, manual});
export const addManual = (id, content) => async (dispatch) => {
	let response = await manualsService.createManual(id, content);
	if(response.status === 201){
		dispatch(setNewManual(content));
		toast.success('Данные успешно добавлены')
	}
}

const deleteManual = (id) => ({type: RemoveManual, id});
export const removeManual = (id) => async (dispatch) => {
	let response = await manualsService.removeManual(id);
	if(response.status === 204){
		dispatch(deleteManual(id));
		toast.success('Данные успешно удалены')
	}
}

const setRecoveryManual = (id) => ({type: RecoveryManual, id});
export const recoveryManual = (id) => async (dispatch) => {
	let response = await manualsService.recoveryManual(id);
	if(response.status === 204){
		dispatch(setRecoveryManual(id));
		toast.success('Данные успешно восстановлены')
	}
}