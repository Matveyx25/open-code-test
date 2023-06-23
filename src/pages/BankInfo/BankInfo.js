import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { Input } from '../../components/BankInfo/Input/Input';
import { Button } from '../../components/BankInfo/Button/Button';
import { Filters } from '../../modules/BankInfo/Filters/Filters';
import { Events } from '../../modules/BankInfo/Events/Events';
import { Loader } from '@fluentui/react-northstar';
import { DataTable } from '../../modules/BankInfo/DataTable/DataTable';

export const BankInfo = ({getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo, fetchingList, banksInfo}) => {
	const [selected, setSelected] = useState()
	const [dialog, setDialog] = useState(false)
	const [bankInfoName, setBankInfoName] = useState('')

	useEffect(() => {
		if(dialog === 'edit'){
			setBankInfoName(banksInfo.find(el => el.id === selected).name)
		}else if(!dialog){
			setBankInfoName('')
		}
	}, [dialog])

	const getWithFilters = (filters) => {
		getAllBanksInfo(filters)
	}

	return (
		<>
			<Popup open={dialog == 'create'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<Input value={bankInfoName} onChange={(e) => setBankInfoName(e.currentTarget.value)} label={'Наименование'}/>
					<Button content="Создать" onClick={() => {
						addBankInfo({name: bankInfoName})
						setDialog(false)
					}}/>
				</div>
			</Popup>
			<Popup open={dialog == 'edit'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<Input value={bankInfoName} onChange={(e) => setBankInfoName(e.currentTarget.value)} label={'Наименование'}/>
					<Button content="Изменить" onClick={() => {
						updateBankInfo(selected, {name: bankInfoName})
						setDialog(false)
					}}/>
				</div>
			</Popup>
			<Filters {...{getWithFilters}}/>
			<Events {...{selected, setDialog, removeBankInfo, updateHandler: () => getAllBanksInfo()}}/>
			{fetchingList.includes('get-all-banks-info') ? 
			<Loader/>
			: <DataTable {...{banksInfo, selected, setSelected}}/>			}
		</>
	)
}
