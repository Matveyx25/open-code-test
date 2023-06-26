import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { Input } from '../../components/BankInfo/Input/Input';
import { Button } from '../../components/BankInfo/Button/Button';
import { Filters } from '../../modules/BankInfo/Filters/Filters';
import { Events } from '../../modules/BankInfo/Events/Events';
import { Loader } from '@fluentui/react-northstar';
import { DataTable } from '../../modules/BankInfo/DataTable/DataTable';
import { toast } from 'react-toastify';

export const BankInfo = ({getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo, fetchingList, banksInfo, recoveryBankInfo}) => {
	const [selected, setSelected] = useState()
	const [dialog, setDialog] = useState(false)
	const [bankInfoName, setBankInfoName] = useState('')
	const [isDeleted, setIsDeleted] = useState(false)

	useEffect(() => {
		if(dialog === 'edit'){
			setBankInfoName(banksInfo.find(el => el.id === selected).name)
		}else if(!dialog){
			setBankInfoName('')
		}
	}, [dialog])

	const getWithFilters = (filters) => {
		getAllBanksInfo(filters)
		setSelected()
	}

	return (
		<>
			<Popup open={dialog == 'create'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<Input value={bankInfoName} onChange={(e) => setBankInfoName(e.currentTarget.value)} label={'Наименование'}/>
					<Button content="Создать" onClick={() => {
						if(bankInfoName.trim()){
							addBankInfo({name: bankInfoName})
							setDialog(false)
						}else{
							toast.error('Введите данные корректно')
						}
					}}/>
				</div>
			</Popup>
			<Popup open={dialog == 'edit'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<Input value={bankInfoName} onChange={(e) => setBankInfoName(e.currentTarget.value)} label={'Наименование'}/>
					<Button content="Изменить" onClick={() => {
						if(bankInfoName.trim()){
							updateBankInfo(selected, {name: bankInfoName})
							setDialog(false)
						}else{
							toast.error('Введите данные корректно')
						}
					}}/>
				</div>
			</Popup>
			<Filters {...{getWithFilters, setIsDeleted}}/>
			<Events {...{selected, setDialog, removeBankInfo, updateHandler: () => getAllBanksInfo(), recoveryBankInfo, isDeleted}}/>
			{fetchingList.includes('get-all-banks-info') ? 
			<Loader/>
			: <DataTable {...{banksInfo, selected, setSelected}}/>			}
		</>
	)
}
