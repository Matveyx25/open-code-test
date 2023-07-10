import { concatTimeAndUser } from '../../../helpers/concatTimeAndUser';
import { Table, tableHeaderCellBehavior } from '@fluentui/react-northstar';
import s from './DataTable.module.scss'
import { useState } from 'react';
import { Button } from '../Button/Button';

export const SWBICTable = ({bic}) => {
 const [isOpen, setIsOpen] = useState(false)

	const swbics = bic?.swbics?.map(el => 
		({key: el.id,
			items: [ 
				el.id, 
				el.swbic,
				el.createDateTime, 
				el.changeDateTime, 
			] 
			})
		)

	const accounts = bic?.accounts?.map(el => 
		({key: el.id,
			items: [ 
				el.id, 
				el.account,
				el.regulationAccountType, 
				el.accountCBRBIC, 
				el.controlKey, 
				el.dateIn, 
				el.dateOut, 
				el.accountStatus, 
			] 
			})
		)
	

	return (
		<>
		<Table.Row>
			<Table.Cell content={bic.bic}/>
			<Table.Cell content={bic.participantInfo.nameP}/>
			<Table.Cell content={bic.participantInfo.regN}/>
			<Table.Cell content={bic.participantInfo.cntrCd } style={{maxWidth: 80}}/>
			<Table.Cell content={bic.participantInfo.rgn} style={{maxWidth: 80}}/>
			<Table.Cell content={bic.participantInfo.ind} style={{maxWidth: 80}}/>
			<Table.Cell content={bic.participantInfo.tnp + " " + bic.participantInfo.nnp + " " + bic.participantInfo.adr}/>
			<Table.Cell content={bic.participantInfo.dateIn}/>
			<Table.Cell content={bic.participantInfo.dateOut} style={{maxWidth: 80}}/>
			<Table.Cell content={bic.participantInfo.ptType} style={{maxWidth: 80}}/>
			<Table.Cell content={bic.participantInfo.srvcs} style={{maxWidth: 80}}/>
			<Table.Cell content={bic.participantInfo.xchType} style={{maxWidth: 80}}/>
			<Table.Cell content={bic.participantInfo.participantStatus} style={{maxWidth: 80}}/>
			<Table.Cell content={bic.swbics.length > 0 && <Button content={isOpen ? "Закрыть" : "Открыть"} onClick={() => setIsOpen(!isOpen)}/>}/>
		</Table.Row>
		{isOpen &&
			<div className={s.swbics}>
				<Table aria-label="table">
						<Table.Row header>
							<Table.Cell content="" accessibility={tableHeaderCellBehavior} style={{maxWidth: 30}}/>
							<Table.Cell content="SWBIC" accessibility={tableHeaderCellBehavior} />
							<Table.Cell content="Создан" accessibility={tableHeaderCellBehavior} />
							<Table.Cell content="Изменен" accessibility={tableHeaderCellBehavior} />
						</Table.Row>
						{swbics && swbics.map((row) => 
							<Table.Row 
							key={'table-key__' + row.key} >
								<Table.Cell content={row.items[0]} style={{maxWidth: 30}}/>
								<Table.Cell content={row.items[1]}/>
								<Table.Cell content={row.items[2]}/>
								<Table.Cell content={row.items[3]}/>
							</Table.Row>)}
				</Table>
				<Table aria-label="table">
						<Table.Row header>
							<Table.Cell content="" accessibility={tableHeaderCellBehavior} style={{maxWidth: 30}}/>
							<Table.Cell content="Номер счета" accessibility={tableHeaderCellBehavior} />
							<Table.Cell content="Тип" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
							<Table.Cell content="БИК ПБР" accessibility={tableHeaderCellBehavior} style={{maxWidth: 80}}/>
							<Table.Cell content="Контрольный ключ" accessibility={tableHeaderCellBehavior} />
							<Table.Cell content="Открытие" accessibility={tableHeaderCellBehavior} />
							<Table.Cell content="Исключение" accessibility={tableHeaderCellBehavior} />
							<Table.Cell content="Статус" accessibility={tableHeaderCellBehavior} style={{maxWidth: 60}}/>
						</Table.Row>
						{accounts && accounts.map((row) => 
							<Table.Row 
							key={'table-key__' + row.key} >
								<Table.Cell content={row.items[0]} style={{maxWidth: 30}}/>
								<Table.Cell content={row.items[1]}/>
								<Table.Cell content={row.items[2]} style={{maxWidth: 80}}/>
								<Table.Cell content={row.items[3]} style={{maxWidth: 80}}/>
								<Table.Cell content={row.items[4]}/>
								<Table.Cell content={row.items[5]}/>
								<Table.Cell content={row.items[6]}/>
								<Table.Cell content={row.items[7]} style={{maxWidth: 60}}/>
							</Table.Row>)}
				</Table>
			</div>
		}
		</>
	)
}
