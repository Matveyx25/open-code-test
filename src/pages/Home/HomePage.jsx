import { BuildingBankRegular, CommentRegular } from '@fluentui/react-icons'
import React from 'react'
import s from './HomePage.module.scss'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
	const navigate = useNavigate()

	return (
		<div className={s.flex}>
			<div onClick={() => navigate('/bank-info')}>
				<BuildingBankRegular/>
				Bank Info
			</div>
			<div onClick={() => navigate('/messages')}>
				<CommentRegular/>
				EMessages
			</div>
		</div>
	)
}
