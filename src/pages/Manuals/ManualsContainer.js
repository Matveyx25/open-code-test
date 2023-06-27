import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Manuals } from './Manuals'
import { getManualById, addManual, removeManual, updateManual, recoveryManual } from '../../store/reducers/manuals.reducer'
import { useNavigate, useParams } from 'react-router-dom'

const ManualsContainer = ({manuals, getManualById, fetchingList, addManual, removeManual, updateManual, recoveryManual, pages}) => {
	const params = useParams()
	const navigate = useNavigate()
	const id = params.id

	useEffect(() => {
		if(!id){
			navigate('/')
		}
	}, [])

	return <Manuals {...{
		manuals, 
		fetchingList, 
		addManual, 
		id, 
		removeManual, 
		getManualById, 
		updateManual,
		recoveryManual, 
		pages}}/>
}

const mapStateToProps = (state) => ({
	manuals: state.manuals.currentManual,
	fetchingList: state.manuals.fetchingList,
	pages: state.manuals.pages
})

export default connect(mapStateToProps, {getManualById, addManual, removeManual, recoveryManual, updateManual})(ManualsContainer)