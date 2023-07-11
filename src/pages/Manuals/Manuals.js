import { useEffect, useState } from "react"
import { DataTable } from "../../modules/Manuals/DataTable/DataTable"
import { Events } from "../../modules/Manuals/Events/Events"
import { Filters } from "../../modules/Manuals/Filters/Filters"
import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css';
import { Input } from "../../components/UI/Input/Input"
import { Button } from "../../components/UI/Button/Button"
import { Loader } from "@fluentui/react-northstar"
import { toast } from "react-toastify"
import { ArrowLeftFilled } from "@fluentui/react-icons"
import { useLocation, useNavigate } from "react-router-dom"
import { Paginator } from "../../components/UI/Paginator/Paginator"

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

	const { state } = useLocation();
	const { name } = state;

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
							navigate('/bank-info')
						}else{
							navigate(-1)
						}
					}}/>
					{name && <p>{name}</p>}
			</div>
			<Filters {...{getWithFilters, setIsDeleted, setFilters}}/>
			<Events {...{selected, setDialog, removeManual, updateHandler: () => {
				setPage(1)
				setSelected()
				getManualById(id, filters, page)
			}, isDeleted, recoveryManual}}/>
			{fetchingList.includes('get-manual-by-id') ? 
			<Loader/>
			: <DataTable {...{manuals, selected, setSelected}}/>}
			<Paginator {...{pages, page, setPage}}/>
		</>
	)
}
