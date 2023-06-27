import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BankInfo } from './BankInfo'
import { getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo, recoveryBankInfo } from '../../store/reducers/bank-info.reducer'

const BankInfoContainer = ({getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo, fetchingList, banksInfo, recoveryBankInfo, pages}) => 
	<BankInfo {...{getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo, fetchingList, banksInfo, recoveryBankInfo, pages}}/>

const mapStateToProps = (state) => ({
	banksInfo: state.bankInfo.banksInfo,
	fetchingList: state.bankInfo.fetchingList,
	pages: state.bankInfo.pages
})

export default connect(mapStateToProps, { getAllBanksInfo, updateBankInfo, addBankInfo, removeBankInfo, recoveryBankInfo })(BankInfoContainer)