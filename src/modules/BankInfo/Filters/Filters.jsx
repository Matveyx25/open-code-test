import { useFormik } from 'formik'
import s from './Filters.module.scss'
import { Input } from '../../../components/BankInfo/Input/Input';
import { Button } from '../../../components/BankInfo/Button/Button';
import { Checkbox } from '../../../components/BankInfo/Checkbox/Checkbox';
import { TrashCanIcon } from '@fluentui/react-icons-northstar';

export const Filters = ({getWithFilters}) => {
	const formik = useFormik({
		initialValues: {
			name: '',
			deleted: false,
		},
		onSubmit: () => {
			getWithFilters(values)
		}
	});

	const {handleReset, values, handleChange, handleSubmit} = formik
	const {name, deleted} = values

	return (
		<div className={s.wrapper}>
				<div className={s.form}>
					<Input name="name" label='Наименование' value={name} onChange={handleChange}/>
					<Checkbox name="deleted" label='Искать удаленные' value={deleted} onChange={handleChange}/>
					
					<div className={s.btns}>
						<Button content='Найти' onClick={handleSubmit} secondary/>
						<Button content='Сброс' icon={<TrashCanIcon/>} primary onClick={handleReset}/>
					</div>
				</div>
		</div>
	)
}
