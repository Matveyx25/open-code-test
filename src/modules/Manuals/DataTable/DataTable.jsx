import { Table } from '@fluentui/react-northstar'
import s from './DataTable.module.scss'

const header = {
  items: ['Код', 'Наименование', 'Создано', 'Изменено'],
}



export const DataTable = ({manuals}) => {
	return (
		<div className={s.wrapper}>
 			<Table header={header}  rows={manuals.map(el => 
				({key: el.Id,
				 items: [el.Code, el.Description, el.CTime + ' - ' + el.CUser, el.ETime + ' - ' + el.EUser]}))}/>
		</div>
	)
}