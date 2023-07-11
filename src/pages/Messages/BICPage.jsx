import { Loader } from '@fluentui/react-northstar'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BicTable } from '../../modules/Messages/DataTable/BicTable'
import { getMessageById } from '../../store/reducers/messages.reducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftFilled } from '@fluentui/react-icons';
import { Paginator } from '../../components/UI/Paginator/Paginator';

const BICPage = ({getMessageById, currentMessage, fetchingList, pages}) => {
	const params = useParams()
	const id = params.id
	const location = useLocation()
	const navigate = useNavigate()

	const [page, setPage] = useState(1)

	const { state } = useLocation();
	const { name } = state;

	useEffect(() => {
		getMessageById(id, null, page)
	}, [page])

	return (
		<div>
			<div className="back-button-wrapper">
					<ArrowLeftFilled onClick={() => {
						if(location.key === 'default'){
							navigate('/messages')
						}else{
							navigate(-1)
						}
					}}/>
				{name && <p>{name}</p>}
			</div>
			{fetchingList.includes('get-current-message') ? 
				<Loader/>
				: 
				<>
					{currentMessage && <BicTable currentMessage={currentMessage}/>}
				</>}
				<Paginator {...{pages, page, setPage}}/>
		</div>
	)
}


const mapStateToProps = (state) => ({
	currentMessage: state.messages.currentMessage,
	fetchingList: state.messages.fetchingList,
	pages: state.messages.pages
})

export default connect(mapStateToProps, { getMessageById })(BICPage)