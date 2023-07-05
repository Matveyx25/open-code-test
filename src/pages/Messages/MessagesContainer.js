import React from 'react'
import { connect } from 'react-redux'
import { Messages } from './Messages'
import { getAllMessages, updateMessage, addMessage, removeMessage, recoveryMessage } from '../../store/reducers/messages.reducer'

const MessagesContainer = ({getAllMessages, updateMessage, addMessage, removeMessage, fetchingList, messages, recoveryMessage, pages}) => 
	<Messages {...{getAllMessages, updateMessage, addMessage, removeMessage, fetchingList, messages, recoveryMessage, pages}}/>

const mapStateToProps = (state) => ({
	messages: state.messages.messages,
	currentMessage: state.messages.currentMessage,
	fetchingList: state.messages.fetchingList,
	pages: state.messages.pages
})

export default connect(mapStateToProps, { getAllMessages, updateMessage, addMessage, removeMessage, recoveryMessage })(MessagesContainer)