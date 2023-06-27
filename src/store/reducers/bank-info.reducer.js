import { toast } from "react-toastify";
import { bankInfoService } from "../../services/bank-info.service";
import { CreateBankInfo, GetAllBankInfo, GetBankInfoConfig, PushToFetchingList, RecoveryBankInfo, RemoveBankInfo, RemoveFromFetchingList, UpdateBankInfo } from "../actions/bank-info.actions";

let initialState = {
    banksInfo: null,
		fetchingList: [],
		pages: 0
};

export const bankInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetAllBankInfo:
					return {
							...state,
							banksInfo: action.banksInfo
						}
        case GetBankInfoConfig:
					return {
								...state,
								pages: action.pages
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
					return {...state, banksInfo: [...state.banksInfo, action.content]}
        case RemoveBankInfo:
					const remove_index = state.banksInfo.findIndex(el => el.id == action.id)
					return {
							...state,
							banksInfo: [
								...state.banksInfo.slice(0, remove_index),
								...state.banksInfo.slice(remove_index + 1)
							]
					}
        case RecoveryBankInfo:
					const recovery_index = state.banksInfo.findIndex(el => el.id == action.id)
					return {
							...state,
							banksInfo: [
								...state.banksInfo.slice(0, recovery_index),
								...state.banksInfo.slice(recovery_index + 1)
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
const setBanksInfoConfig = (pages) => ({type: GetBankInfoConfig, pages});
export const getAllBanksInfo = (filters, page) => async (dispatch) => {
	dispatch(pushToFetchingList('get-all-banks-info'))
	let response = await bankInfoService.getAllBankInfo(filters, page);
	if(response.status === 200){
		dispatch(setAllBanksInfo(response.data.items));
		dispatch(setBanksInfoConfig(response.data.config.countOfPages));
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
		toast.success('Данные успешно изменены')
	}
}

const setNewBankInfo = (content) => ({type: CreateBankInfo, content});
export const addBankInfo = (content) => async (dispatch) => {
	let response = await bankInfoService.createBankInfo(content);
	if(response.status === 201){
		dispatch(setNewBankInfo(content));
		toast.success('Данные успешно добавлены')
	}
}

const deleteBankInfo = (id) => ({type: RemoveBankInfo, id});
export const removeBankInfo = (id) => async (dispatch) => {
	let response = await bankInfoService.removeBankInfo(id);
	if(response.status === 204){
		dispatch(deleteBankInfo(id));
		toast.success('Данные успешно удалены')
	}
}

const setRecoveryBankInfo = (id) => ({type: RecoveryBankInfo, id});
export const recoveryBankInfo = (id) => async (dispatch) => {
	let response = await bankInfoService.recoveryBankInfo(id);
	if(response.status === 204){
		dispatch(setRecoveryBankInfo(id));
		toast.success('Данные успешно восстановлены')
	}
}