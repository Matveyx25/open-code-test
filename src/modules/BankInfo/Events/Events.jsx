import { Button } from '../../../components/BankInfo/Button/Button'
import s from './Events.module.scss'
import { Add32Regular, ArrowCounterclockwise32Regular, Dismiss32Regular, Edit32Regular } from '@fluentui/react-icons'

export const Events = ({selected, setDialog, removeBankInfo, updateHandler}) => {
	const closeHandler = () => {
		const result = window.confirm('Уверены что хотите удалить?')
		if(result){
			removeBankInfo(selected)
		}
	}

	return (
		<div className={s.wrapper}>
			<Button content="Добавить" icon={<Add32Regular/>} onClick={() => setDialog('create')}/>
			<Button content="Изменить"  icon={<Edit32Regular/>} disabled={!selected} onClick={() => setDialog('edit')}/>
			<Button content="Удалить" icon={<Dismiss32Regular/>} disabled={!selected} onClick={closeHandler}/>
			<Button content="Обновить" icon={<ArrowCounterclockwise32Regular/>} onClick={updateHandler}/>
		</div>
	)
}