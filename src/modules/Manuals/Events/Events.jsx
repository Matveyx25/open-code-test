import { Button } from '../../../components/UI/Button/Button'
import s from './Events.module.scss'
import { Add32Regular, ArrowCounterclockwise32Regular, ArrowReset32Regular, Dismiss32Regular, Edit32Regular } from '@fluentui/react-icons'

export const Events = ({selected, setDialog, removeManual, updateHandler, isDeleted, recoveryManual}) => {
	const closeHandler = () => {
		const result = window.confirm('Уверены что хотите удалить?')
		if(result){
			removeManual(selected)
		}
	}

	return (
		<div className={s.wrapper}>
			<Button content="Добавить" icon={<Add32Regular/>} onClick={() => setDialog('create')}/>
			<Button content="Изменить"  icon={<Edit32Regular/>} disabled={!selected || isDeleted} onClick={() => setDialog('edit')}/>
			<Button content="Удалить" icon={<Dismiss32Regular/>} disabled={!selected || isDeleted} onClick={closeHandler}/>
			<Button content="Восстановить" icon={<ArrowReset32Regular/>} disabled={!selected || !isDeleted} onClick={() => recoveryManual(selected)}/>
			<Button content="Обновить" icon={<ArrowCounterclockwise32Regular/>} onClick={updateHandler}/>
		</div>
	)
}
