import s from './Input.module.scss'
import { Input as FormInput } from '@fluentui/react-northstar';

export const Input = ({label, placeholder, name, id, type, value, onChange}) => 
	<FormInput className={s.input} {...{label, placeholder, name, id, type, onChange, value}}/>
