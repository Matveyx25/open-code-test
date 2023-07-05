import s from './Checkbox.module.scss'
import { Checkbox as CheckboxFL } from '@fluentui/react'

export const Checkbox = ({name, label, value, onChange}) => {
	return (
		<>
				<CheckboxFL {...{name, label, value, onChange}}/>
		</>
	)
}
