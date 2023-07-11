import React from 'react'
import { connect } from 'react-redux'
import { Messages } from './Messages'
import { getAllMessages, updateMessageName, addMessage, removeMessage, recoveryMessage, getMessageById, getMessageFromServer } from '../../store/reducers/messages.reducer'

const MessagesContainer = ({getAllMessages, getMessageById, updateMessageName, addMessage, removeMessage, fetchingList, messages, recoveryMessage, pages, currentMessage, getMessageFromServer}) => 
	<Messages {...{getAllMessages, getMessageById, updateMessageName, addMessage, removeMessage, fetchingList, messages, recoveryMessage, pages, currentMessage, getMessageFromServer}}/>

const mapStateToProps = (state) => ({
	messages: state.messages.messages,
	currentMessage: state.messages.currentMessage,
	fetchingList: state.messages.fetchingList,
	pages: state.messages.pages
})

export default connect(mapStateToProps, { getAllMessages, updateMessageName, getMessageById, addMessage, removeMessage, recoveryMessage, getMessageFromServer })(MessagesContainer)