import s from './Button.module.scss'
import { Button as ButtonFL } from '@fluentui/react-northstar'

export const Button = ({content, onClick, icon, primary, secondary, disabled}) => 
		<ButtonFL iconPosition="before" {...{onClick, content, icon, primary, secondary, disabled}}/>
