import s from './DataTable.module.scss'
import { concatTimeAndUser } from '../../../helpers/concatTimeAndUser';
import { Table, tableHeaderCellBehavior } from '@fluentui/react-northstar';

export const DataTable = ({banksInfo, selected, setSelected}) => {

	const items = banksInfo?.map(el => 
		({key: el.id,
			items: [ 
				el.id, 
				el.name, 
				concatTimeAndUser(el.ctime, el.cuser), 
				concatTimeAndUser(el.etime, el.euser)]
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
						<Table.Cell content="Создано" accessibility={tableHeaderCellBehavior} />
						<Table.Cell content="Изменено" accessibility={tableHeaderCellBehavior} />
					</Table.Row>
					{items && items.map((row) => 
					<div className={selected === row.key && s.activeRow}>
						<Table.Row 
						key={'table-key__' + row.key} >
							<Table.Cell content={row.items[0]} onClick={() => selectHandler(row.key)} style={{maxWidth: 30}}/>
							<Table.Cell content={row.items[1]} onClick={() => selectHandler(row.key)}/>
							<Table.Cell content={row.items[2]} onClick={() => selectHandler(row.key)}/>
							<Table.Cell content={row.items[3]} onClick={() => selectHandler(row.key)}/>
						</Table.Row>
					</div>)}
			</Table>
		</div>
	)
}