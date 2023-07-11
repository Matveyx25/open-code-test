import { Button } from '../../../components/UI/Button/Button'
import s from './Events.module.scss'
import { Add32Regular, ArrowCounterclockwise32Regular, ArrowReset32Regular, BuildingBank48Regular, Dismiss32Regular, Edit32Regular } from '@fluentui/react-icons'

export const Events = ({selected, setDialog, removeMessage, updateHandler, isDeleted, recoveryMessage, getMessageFromServer}) => {
	const closeHandler = () => {
		const result = window.confirm('Уверены что хотите удалить?')
		if(result){
			removeMessage(selected)
		}
	}

	return (
		<div className={s.wrapper}>
			<Button content="Добавить" icon={<Add32Regular/>} onClick={() => setDialog('create')}/>
			<Button content="Изменить"  icon={<Edit32Regular/>} disabled={!selected || isDeleted} onClick={() => setDialog('edit')}/>
			<Button content="Удалить" icon={<Dismiss32Regular/>} disabled={!selected || isDeleted} onClick={closeHandler}/>
			<Button content="Восстановить" icon={<ArrowReset32Regular/>} disabled={!selected || !isDeleted} onClick={() => recoveryMessage(selected)}/>
			<Button content="Обновить" icon={<ArrowCounterclockwise32Regular/>} onClick={updateHandler}/>
			<Button content="Актуализировать с ЦБ" icon={<BuildingBank48Regular/>} disabled={isDeleted} onClick={getMessageFromServer}/>
		</div>
	)
}
