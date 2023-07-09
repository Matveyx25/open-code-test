import React from 'react'
import { connect } from 'react-redux'
import { Messages } from './Messages'
import { getAllMessages, updateMessageName, addMessage, removeMessage, recoveryMessage } from '../../store/reducers/messages.reducer'

const MessagesContainer = ({getAllMessages, updateMessageName, addMessage, removeMessage, fetchingList, messages, recoveryMessage, pages}) => 
	<Messages {...{getAllMessages, updateMessageName, addMessage, removeMessage, fetchingList, messages, recoveryMessage, pages}}/>

const mapStateToProps = (state) => ({
	messages: state.messages.messages,
	currentMessage: state.messages.currentMessage,
	fetchingList: state.messages.fetchingList,
	pages: state.messages.pages
})

export default connect(mapStateToProps, { getAllMessages, updateMessageName, addMessage, removeMessage, recoveryMessage })(MessagesContainer)