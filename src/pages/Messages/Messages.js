import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { Filters } from '../../modules/Messages/Filters/Filters';
import { Events } from '../../modules/Messages/Events/Events';
import { Loader } from '@fluentui/react-northstar';
import { DataTable } from '../../modules/Messages/DataTable/DataTable';
import { toast } from 'react-toastify';
import { Paginator } from '../../components/UI/Paginator/Paginator';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { HomeRegular } from '@fluentui/react-icons';

export const Messages = ({getAllMessages, updateMessageName, addMessage, removeMessage, fetchingList, messages, recoveryMessage, pages}) => {
	const [selected, setSelected] = useState()
	const [dialog, setDialog] = useState(false)
	const [messageName, setMessageName] = useState('')
	const [isDeleted, setIsDeleted] = useState(false)
	const [page, setPage] = useState(1)
	const [filters, setFilters] = useState(null)
	const [files, setFiles] = useState([]);
	const {getRootProps, getInputProps} = useDropzone({
		maxFiles: 1,
    accept: {
			'text/xml': ['.xml']
		},
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

	const navigate = useNavigate()
	
	useEffect(() => {
		getAllMessages(filters, page)
	}, [page])

	useEffect(() => {
		if(dialog === 'edit'){
			setMessageName(messages.find(el => el.id === selected).name)
		}else if(!dialog){
			setMessageName('')
		}
	}, [dialog])

	const getWithFilters = (obj) => {
		getAllMessages(obj, 1)
		setFilters(obj)
		setPage(1)
		setSelected()
	}

	return (
		<>
			<Popup open={dialog == 'create'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<div {...getRootProps({className: 'dropzone'})}>
						<input {...getInputProps()} />
						<p>{files[0]?.name || "Перетащите сюда xml-файл, или нажмите, чтобы выбрать"}</p>
					</div>
					<Button content="Создать" onClick={() => {
						if(files){
							addMessage(files[0])
							setDialog(false)
						}else{
							toast.error('Введите данные корректно')
						}
					}}/>
				</div>
			</Popup>
			<Popup open={dialog == 'edit'} onClose={() => setDialog(false)} position="right center">
				<div className='popup-wrapper'>
					<Input value={messageName} onChange={(e) => setMessageName(e.currentTarget.value)} label={'Наименование'}/>
					<Button content="Изменить" onClick={() => {
						if(messageName.trim()){
							updateMessageName(selected, messageName)
							setDialog(false)
						}else{
							toast.error('Введите данные корректно')
						}
					}}/>
				</div>
			</Popup>
			<div className="back-button-wrapper">
					<HomeRegular onClick={() => navigate('/')}/>
			</div>
			<Filters {...{getWithFilters, setIsDeleted}}/>
			<Events {...{selected, setDialog, removeMessage, updateHandler: () => getAllMessages(), recoveryMessage, isDeleted}}/>
			{fetchingList.includes('get-all-messages') ? 
			<Loader/>
			: <DataTable {...{messages, selected, setSelected}}/>			}
			<Paginator {...{page, setPage, pages}}/>
		</>
	)
}
