import { CreateManual, GetManualById, PushToFetchingList, RemoveFromFetchingList, RemoveManual, UpdateManual } from '../actions/manuals.actions';
import { manualsService } from '../../services/manuals.service';

let initialState = {
		currentManual: null,
		fetchingList: [],
};

export const manualsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetManualById:
					return {
						...state,
						currentManual: action.currentManual
					}
        case UpdateManual:
					return {
						...state,
						currentManual: action.currentManual
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

const setCurrentManual = (currentManual) => ({type: GetManualById, currentManual});
export const getManualById = (id) => async (dispatch) => {
	dispatch(pushToFetchingList('get-manual-by-id'))
	let response = await manualsService.getManualById(id);
	if(response.status === 200){
		dispatch(setCurrentManual(response.data.items));
		dispatch(removeFromFetchingList('get-manual-by-id'))
	}else{
		dispatch(removeFromFetchingList('get-manual-by-id'))
	}
}

const setUpdateManual = (currentManual) => ({type: UpdateManual, currentManual});
export const updateManual = (id, content) => async (dispatch) => {
	let response = await manualsService.updateManual(id, content);
	if(response.status === 204){
		dispatch(setUpdateManual(content));
	}
}

const setNewManual = (manual) => ({type: CreateManual, manual});
export const addManual = (id, content) => async (dispatch) => {
	let response = await manualsService.createManual(id, content);
	if(response.status === 201){
		dispatch(setNewManual(content));
	}
}

const deleteManual = (id) => ({type: RemoveManual, id});
export const removeManual = (id) => async (dispatch) => {
	let response = await manualsService.removeManual(id);
	if(response.status === 204){
		dispatch(deleteManual(id));
	}
}