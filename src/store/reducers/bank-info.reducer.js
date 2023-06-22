import { bankInfoService } from "../../services/bank-info.service";
import { CreateBankInfo, GetAllBankInfo, RemoveBankInfo, UpdateBankInfo } from "../actions/bank-info.actions";

let initialState = {
    banksInfo: null
};

export const bankInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetAllBankInfo:
            return {
                ...state,
                banksInfo: action.banksInfo
            }
        case UpdateBankInfo:
						const update_index = state.banksInfo.findIndex(el => el.id == action.bankInfo.id)
            return {
                ...state,
                banksInfo: [
									...state.banksInfo.slice(0, update_index),
									{id: action.bankInfo.id, Name: action.bankInfo.content.Name},
									...state.banksInfo.slice(update_index + 1)
								]
            }
        case CreateBankInfo:
            return state
        case RemoveBankInfo:
					const remove_index = state.banksInfo.findIndex(el => el.id == action.id)
					return {
							...state,
							banksInfo: [
								...state.banksInfo.slice(0, remove_index),
								...state.banksInfo.slice(remove_index + 1)
							]
					}
        default:
            return state;
    }
}

const setAllBanksInfo = (banksInfo) => ({type: GetAllBankInfo, banksInfo});
export const getAllBanksInfo = (filters) => async (dispatch) => {
	let response = await bankInfoService.getAllBankInfo(filters);
	if(response.status === 200){
		dispatch(setAllBanksInfo(response.data.items));
	}
}

const setUpdateBankInfo = (bankInfo) => ({type: UpdateBankInfo, bankInfo});
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