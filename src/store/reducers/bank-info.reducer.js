import { bankInfoService } from "../../services/bank-info.service";
import { CreateBankInfo, GetAllBankInfo, PushToFetchingList, RemoveBankInfo, RemoveFromFetchingList, UpdateBankInfo } from "../actions/bank-info.actions";

let initialState = {
    banksInfo: null,
		fetchingList: []
};

export const bankInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetAllBankInfo:
            return {
                ...state,
                banksInfo: action.banksInfo
            }
        case UpdateBankInfo:
						const update_index = state.banksInfo.findIndex(el => el.id == action.payload.id)
            return {
                ...state,
                banksInfo: [
									...state.banksInfo.slice(0, update_index),
									{id: action.payload.id, name: action.payload.content.name},
									...state.banksInfo.slice(update_index + 1)
								]
            }
        case CreateBankInfo:
					return {...state, banksInfo: [...state.banksInfo, action.bankInfo]}
        case RemoveBankInfo:
					const remove_index = state.banksInfo.findIndex(el => el.id == action.id)
					return {
							...state,
							banksInfo: [
								...state.banksInfo.slice(0, remove_index),
								...state.banksInfo.slice(remove_index + 1)
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

const setAllBanksInfo = (banksInfo) => ({type: GetAllBankInfo, banksInfo});
export const getAllBanksInfo = (filters) => async (dispatch) => {
	dispatch(pushToFetchingList('get-all-banks-info'))
	let response = await bankInfoService.getAllBankInfo(filters);
	if(response.status === 200){
		dispatch(setAllBanksInfo(response.data.items));
		dispatch(removeFromFetchingList('get-all-banks-info'))
	}else{
		dispatch(removeFromFetchingList('get-all-banks-info'))
	}
}

const setUpdateBankInfo = ({id, content}) => ({type: UpdateBankInfo, payload: {id, content}});
export const updateBankInfo = (id, content) => async (dispatch) => {
	let response = await bankInfoService.updateBankInfo(id, content);
	if(response.status === 204){
		dispatch(setUpdateBankInfo({id, content}));
	}
}

const setNewBankInfo = (bankInfo) => ({type: CreateBankInfo, bankInfo});
export const addBankInfo = (content) => async (dispatch) => {
	let response = await bankInfoService.createBankInfo(content);
	if(response.status === 204){
		dispatch(setNewBankInfo(content));
	}
}

const deleteBankInfo = (id) => ({type: RemoveBankInfo, id});
export const removeBankInfo = (id) => async (dispatch) => {
	let response = await bankInfoService.removeBankInfo(id);
	if(response.status === 204){
		dispatch(deleteBankInfo(id));
	}
}