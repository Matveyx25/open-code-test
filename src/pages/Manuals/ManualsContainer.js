import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Manuals } from './Manuals'
import { getManualById, addManual, removeManual, updateManual } from '../../store/reducers/manuals.reducer'
import { useNavigate, useParams } from 'react-router-dom'

const ManualsContainer = ({manuals, getManualById, fetchingList, addManual, removeManual, updateManual}) => {
	const params = useParams()
	const navigate = useNavigate()
	const id = params.id

	useEffect(() => {
		if(!id){
			navigate('/')
		}
		getManualById(id)
	}, [])

	return <Manuals {...{
		manuals, 
		fetchingList, 
		addManual, 
		id, 
		removeManual, 
		getManualById, 
		updateManual}}/>
}

const mapStateToProps = (state) => ({
	manuals: state.manuals.currentManual,
	fetchingList: state.manuals.fetchingList
})

export default connect(mapStateToProps, {getManualById, addManual, removeManual, updateManual})(ManualsContainer)