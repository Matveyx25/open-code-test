import { useEffect, useState } from "react"
import { DataTable } from "../../modules/Manuals/DataTable/DataTable"
import { Events } from "../../modules/Manuals/Events/Events"
import { Filters } from "../../modules/Manuals/Filters/Filters"
import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css';
import { Input } from "../../components/Manuals/Input/Input"
import { Button } from "../../components/Manuals/Button/Button"

export const Manuals = ({id, manuals, fetchingList, addManual, removeManual, getManualById, updateManual}) => {
	const [selected, setSelected] = useState()
	const [dialog, setDialog] = useState(false)
	const [manualCode, setManualCode] = useState('')
	const [manualDesc, setManualDesc] = useState('')

	useEffect(() => {
		if(dialog === 'edit'){
			setManualCode(manuals.find(el => el.id === selected).code)
			setManualDesc(manuals.find(el => el.id === selected).description)
		}else if(!dialog){
			setManualCode('')
			setManualDesc('')
		}
	}, [dialog])

	return (
		<>
			<Popup open={dialog == 'create'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<Input value={manualCode} onChange={(e) => setManualCode(e.currentTarget.value)} label={'Код'}/>
					<Input value={manualDesc} onChange={(e) => setManualDesc(e.currentTarget.value)} label={'Наименование'}/>
					<Button content="Создать" onClick={() => {
						addManual(id, {code: manualCode, description: manualDesc})
						setDialog(false)
					}}/>
				</div>
			</Popup>
			<Popup open={dialog == 'edit'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<Input value={manualCode} onChange={(e) => setManualCode(e.currentTarget.value)} label={'Код'}/>
					<Input value={manualDesc} onChange={(e) => setManualDesc(e.currentTarget.value)} label={'Наименование'}/>
					<Button content="Создать" onClick={() => {
						console.log({code: manualCode, description: manualDesc});
						updateManual(selected, {code: manualCode, description: manualDesc})
						setDialog(false)
					}}/>
				</div>
			</Popup>
			{fetchingList.includes('get-manual-by-id') ? 
			<p>Loading</p>
			:<div>
				<Filters/>
				<Events {...{selected, setDialog, removeManual, updateHandler: () => getManualById(id)}}/>
				<DataTable {...{manuals, selected, setSelected}}/>			
			</div>}
		</>
	)
}
