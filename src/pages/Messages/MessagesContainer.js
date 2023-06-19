import React from 'react'
import { connect } from 'react-redux'
import { Messages } from './Messages'

const MessagesContainer = () => <Messages/>

export default connect(null, null)(MessagesContainer)