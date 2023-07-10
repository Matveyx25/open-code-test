import s from './DataTable.module.scss'
import { concatTimeAndUser } from '../../../helpers/concatTimeAndUser';
import { Table, tableHeaderCellBehavior } from '@fluentui/react-northstar';
import { SWBICTable } from '../../../components/UI/Tables/SWBICTable';

export const BicTable = ({currentMessage}) => {
	return (
		<div className={s.bicwrapper}>
			<Table aria-label="table">
				<Table.Row header>
					<Table.Cell content="БИК" accessibility={tableHeaderCellBehavior} />
					<Table.Cell content="Наименование" accessibility={tableHeaderCellBehavior} />
					<Table.Cell content="Порядковый" accessibility={tableHeaderCellBehavior} />
					<Table.Cell content="Код страны" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
					<Table.Cell content="Код региона" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
					<Table.Cell content="Индекс" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
					<Table.Cell content="Адресс" accessibility={tableHeaderCellBehavior} />
					<Table.Cell content="Включен" accessibility={tableHeaderCellBehavior} />
					<Table.Cell content="Исключен" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
					<Table.Cell content="Тип участника" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
					<Table.Cell content="Сервисы" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
					<Table.Cell content="Участник обмена" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
					<Table.Cell content="УИС" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
					<Table.Cell content="" accessibility={tableHeaderCellBehavior}/>
				</Table.Row>
				{currentMessage.map(bic => 
				<>
					{bic && <SWBICTable {...{bic}}/>}	
				</>
				)}
			</Table>
		</div>
	)
}
