import { Button } from '../../../components/Manuals/Button/Button'
import s from './Events.module.scss'
import { Add32Regular, ArrowCounterclockwise32Regular, ArrowReset32Regular, Dismiss32Regular, Edit32Regular, Print32Regular } from '@fluentui/react-icons'

export const Events = () => {
	return (
		<div className={s.wrapper}>
			<Button content="Добавить" icon={<Add32Regular/>}/>
			<Button content="Изменить"  icon={<Edit32Regular/>}/>
			<Button content="Удалить" icon={<Dismiss32Regular/>}/>
			<Button content="Восстановить" icon={<ArrowReset32Regular/>}/>
			<Button content="Обновить" icon={<ArrowCounterclockwise32Regular/>}/>
			<Button content="Печать" icon={<Print32Regular/>}/>
		</div>
	)
}
