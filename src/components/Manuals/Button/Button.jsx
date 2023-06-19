import s from './Button.module.scss'
import { Button as ButtonFL, Flex } from '@fluentui/react-northstar'

export const Button = ({content, onClick, icon, primary, secondary}) => 
		<ButtonFL iconPosition="before" {...{onClick, content, icon, primary, secondary}}/>
