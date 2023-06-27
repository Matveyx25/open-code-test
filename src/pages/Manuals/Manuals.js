import { useEffect, useState } from "react"
import { DataTable } from "../../modules/Manuals/DataTable/DataTable"
import { Events } from "../../modules/Manuals/Events/Events"
import { Filters } from "../../modules/Manuals/Filters/Filters"
import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css';
import { Input } from "../../components/Manuals/Input/Input"
import { Button } from "../../components/Manuals/Button/Button"
import { Loader } from "@fluentui/react-northstar"
import { toast } from "react-toastify"
import { ArrowLeftFilled } from "@fluentui/react-icons"
import { useLocation, useNavigate } from "react-router-dom"
import { Paginator } from "../../UI/Paginator/Paginator"

export const Manuals = ({id, manuals, fetchingList, addManual, removeManual, getManualById, updateManual, recoveryManual, pages}) => {
	const navigate = useNavigate()
	const location = useLocation()
	
	const [selected, setSelected] = useState()
	const [dialog, setDialog] = useState(false)
	const [manualCode, setManualCode] = useState('')
	const [manualDesc, setManualDesc] = useState('')
	const [isDeleted, setIsDeleted] = useState(false)
	const [page, setPage] = useState(1)
	const [filters, setFilters] = useState(null)

	useEffect(() => {
		getManualById(id, filters, page)
	}, [page])

	useEffect(() => {
		if(dialog === 'edit'){
			setManualCode(manuals.find(el => el.id === selected).code)
			setManualDesc(manuals.find(el => el.id === selected).description)
		}else if(!dialog){
			setManualCode('')
			setManualDesc('')
		}
	}, [dialog])

	const getWithFilters = (obj) => {
		getManualById(id, obj, 1)
		setPage(1)
		setFilters(obj)
		setSelected()
	}

	return (
		<>
			<Popup open={dialog == 'create'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<Input value={manualCode} onChange={(e) => setManualCode(e.currentTarget.value)} label={'Код'}/>
					<Input value={manualDesc} onChange={(e) => setManualDesc(e.currentTarget.value)} label={'Наименование'}/>
					<Button content="Создать" onClick={() => {
						if(manualCode.trim() && manualDesc.trim()){
							addManual(id, {code: manualCode, description: manualDesc})
							setDialog(false)
						}else{
							toast.error('Введите данные корректно')
						}
					}}/>
				</div>
			</Popup>
			<Popup open={dialog == 'edit'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<Input value={manualCode} onChange={(e) => setManualCode(e.currentTarget.value)} label={'Код'}/>
					<Input value={manualDesc} onChange={(e) => setManualDesc(e.currentTarget.value)} label={'Наименование'}/>
					<Button content="Изменить" onClick={() => {
						if(manualCode.trim() && manualDesc.trim()){
							updateManual(selected, {code: manualCode, description: manualDesc})
							setDialog(false)
						}else{
							toast.error('Введите данные корректно')
						}
					}}/>
				</div>
			</Popup>
			<div className="back-button-wrapper">
					<ArrowLeftFilled onClick={() => {
						if(location.key === 'default'){
							navigate('/')
						}else{
							navigate(-1)
						}
					}}/>
			</div>
			<Filters {...{getWithFilters, setIsDeleted}}/>
			<Events {...{selected, setDialog, removeManual, updateHandler: () => getManualById(id), isDeleted, recoveryManual}}/>
			{fetchingList.includes('get-manual-by-id') ? 
			<Loader/>
			: <DataTable {...{manuals, selected, setSelected}}/>}
			<Paginator {...{pages, page, setPage}}/>
		</>
	)
}
