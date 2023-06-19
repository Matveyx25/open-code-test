import { useFormik } from 'formik'
import s from './Filters.module.scss'
import { Input } from '../../../components/Manuals/Input/Input';
import { Button } from '../../../components/Manuals/Button/Button';
import { Checkbox } from '../../../components/Manuals/Checkbox/Checkbox';
import { TrashCanIcon } from '@fluentui/react-icons-northstar';

export const Filters = () => {
	const formik = useFormik({
		initialValues: {
			code: '',
			name: '',
			enableDate: '',
			isRemoved: false,
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		}
	});

	const {handleReset, values, handleChange, handleSubmit} = formik
	const {code, name, enableDate, isRemoved} = values

	return (
		<div className={s.wrapper}>
				<form>
					<Input name="code" label='Код' value={code} onChange={handleChange}/>
					<Input name="name" label='Наименование' value={name} onChange={handleChange}/>
					<Input name="enableDate" label='Действует на дату' value={enableDate} onChange={handleChange}/>
					<Checkbox name="isRemoved" label='Искать удаленные' value={isRemoved} onChange={handleChange}/>
					
					<div className={s.btns}>
						<Button content='Найти' onClick={handleSubmit} secondary/>
						<Button content='Сброс' icon={<TrashCanIcon/>} primary onClick={handleReset}/>
					</div>
				</form>
		</div>
	)
}
