import { useEffect } from 'react'
import { Checkbox as CheckboxFL } from '@fluentui/react'

export const Checkbox = ({name, label, value, onChange}) => {
	useEffect(() => {
		console.log(value);
	}, [value])

	return (
		<CheckboxFL {...{name, label, onChange}} checked={value}/>
	)
}
