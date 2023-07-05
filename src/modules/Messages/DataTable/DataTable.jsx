import s from './DataTable.module.scss'
import { concatTimeAndUser } from '../../../helpers/concatTimeAndUser';
import { Table, tableHeaderCellBehavior } from '@fluentui/react-northstar';

export const DataTable = ({messages, selected, setSelected}) => {
	const items = messages?.map(el => 
	({key: el.id,
		items: [ 
			el.id, 
			el.eMessageName, 
			el.fileUrl,
			concatTimeAndUser(el.createDateTime, el.createdBy),
			concatTimeAndUser(el.edDate, el.edAuthor + el.edNo + ''), 
			concatTimeAndUser(el.changeDateTime, el.changedBy),
			el.infoTypeCode,
			el.businessDay,
			el.creationDateTime,
		] 
		})
	)

	const selectHandler = (id) => {			
		if(selected === id){
			setSelected('')
		}else{
			setSelected(id)
		}
	}

	return (
		<div className={s.wrapper}>
			<Table aria-label="table">
					<Table.Row header>
						<Table.Cell content="" accessibility={tableHeaderCellBehavior} style={{maxWidth: 30}}/>
						<Table.Cell content="Наименование" accessibility={tableHeaderCellBehavior} />
						<Table.Cell content="Файл" accessibility={tableHeaderCellBehavior} />
						<Table.Cell content="Создан" accessibility={tableHeaderCellBehavior} />
						<Table.Cell content="Составлен ЭС" accessibility={tableHeaderCellBehavior} />
						<Table.Cell content="Изменен" accessibility={tableHeaderCellBehavior} />
						<Table.Cell content="Код" accessibility={tableHeaderCellBehavior} />
						<Table.Cell content="Дата ОД" accessibility={tableHeaderCellBehavior} />
						<Table.Cell content="Дата создания ЭС" accessibility={tableHeaderCellBehavior} />
					</Table.Row>
					{items && items.map((row) => 
					<div className={selected === row.key && s.activeRow}>
						<Table.Row 
						key={'table-key__' + row.key} >
							<Table.Cell content={row.items[0]} onClick={() => selectHandler(row.key)} style={{maxWidth: 30}}/>
							<Table.Cell content={row.items[1]} onClick={() => selectHandler(row.key)}/>
							<Table.Cell content={row.items[2]} onClick={() => selectHandler(row.key)}/>
							<Table.Cell content={row.items[3]} onClick={() => selectHandler(row.key)}/>
							<Table.Cell content={row.items[4]} onClick={() => selectHandler(row.key)}/>
							<Table.Cell content={row.items[5]} onClick={() => selectHandler(row.key)}/>
							<Table.Cell content={row.items[6]} onClick={() => selectHandler(row.key)}/>
							<Table.Cell content={row.items[7]} onClick={() => selectHandler(row.key)}/>
							<Table.Cell content={row.items[8]} onClick={() => selectHandler(row.key)}/>
						</Table.Row>
					</div>)}
			</Table>
		</div>
	)
}