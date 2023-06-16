import { CreateManual, GetManualById, RemoveManual, UpdateManual } from '../actions/manuals.actions';
import { manualsService } from '../../services/manuals.service';

let initialState = {
		currentManual: null
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
          return state
        case RemoveManual:
					return state
        default:
            return state;
    }
}

const setCurrentManual = (currentManual) => ({type: GetManualById, currentManual});
export const getManualById = (id) => async (dispatch) => {
	let response = await manualsService.getManualById(id);
	if(response.status === 200){
		dispatch(setCurrentManual(response.data));
	}
}

const setUpdateManual = (currentManual) => ({type: UpdateManual, currentManual});
export const updateManual = (id, content) => async (dispatch) => {
	let response = await manualsService.updateManual(id, content);
	if(response.status === 204){
		dispatch(setUpdateManual(content));
	}
}

const setNewManual = (bankInfo) => ({type: CreateManual, bankInfo});
export const addManual = (content) => async (dispatch) => {
	let response = await manualsService.createManual(content);
	if(response.status === 204){
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