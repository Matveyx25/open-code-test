import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BankInfo } from './BankInfo'
import { getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo } from '../../store/reducers/bank-info.reducer'

const BankInfoContainer = ({getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo, fetchingList, banksInfo}) => {
	useEffect(() => {
		getAllBanksInfo()
	}, [])
	
	return <BankInfo {...{getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo, fetchingList, banksInfo}}/>
}

const mapStateToProps = (state) => ({
	banksInfo: state.bankInfo.banksInfo,
	fetchingList: state.bankInfo.fetchingList
})

export default connect(mapStateToProps, { getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo })(BankInfoContainer)