import { useFormik } from 'formik'
import s from './Filters.module.scss'
import { Input } from '../../../components/UI/Input/Input';
import { Button } from '../../../components/UI/Button/Button';
import { Checkbox } from '../../../components/UI/Checkbox/Checkbox';
import { TrashCanIcon } from '@fluentui/react-icons-northstar';

export const Filters = ({getWithFilters, setIsDeleted}) => {
	const formik = useFormik({
		initialValues: {
			emessage_name: '',
			deleted: false,
		},
		onSubmit: () => {
			getWithFilters(values)
			setIsDeleted(values.deleted)
		}
	});

	const {handleReset, values, handleChange, handleSubmit} = formik
	const {emessage_name, deleted} = values

	return (
		<div className={s.wrapper}>
				<div className={s.form}>
					<Input name="emessage_name" label='Наименование' value={emessage_name} onChange={handleChange}/>
					<Checkbox name="deleted" label='Искать удаленные' value={deleted} onChange={handleChange}/>

					<div className={s.btns}>
						<Button content='Найти' onClick={handleSubmit} secondary/>
						<Button content='Сброс' icon={<TrashCanIcon/>} primary onClick={handleReset}/>
					</div>
				</div>
		</div>
	)
}
