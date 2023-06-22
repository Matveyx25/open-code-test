import { useFormik } from 'formik'
import s from './Filters.module.scss'
import { Input } from '../../../components/Manuals/Input/Input';
import { Button } from '../../../components/Manuals/Button/Button';
import { Checkbox } from '../../../components/Manuals/Checkbox/Checkbox';
import { TrashCanIcon } from '@fluentui/react-icons-northstar';

export const Filters = ({getWithFilters}) => {
	const formik = useFormik({
		initialValues: {
			code: '',
			description: '',
			deleted: false,
		},
		onSubmit: () => {
			getWithFilters(values)
		}
	});

	const {handleReset, values, handleChange, handleSubmit} = formik
	const {code, description, deleted} = values

	return (
		<div className={s.wrapper}>
				<div className={s.form}>
					<Input name="code" label='Код' value={code} onChange={handleChange}/>
					<Input name="description" label='Наименование' value={description} onChange={handleChange}/>
					<Checkbox name="deleted" label='Искать удаленные' value={deleted} onChange={handleChange}/>
					
					<div className={s.btns}>
						<Button content='Найти' onClick={handleSubmit} secondary/>
						<Button content='Сброс' icon={<TrashCanIcon/>} primary onClick={handleReset}/>
					</div>
				</div>
		</div>
	)
}
