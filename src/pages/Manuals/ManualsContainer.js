import React from 'react'
import { connect } from 'react-redux'
import { Manuals } from './Manuals'

const manuals = [
  {
    "Id": 0,
    "Code": "RQST",
    "Description": "Ответ на ЭС-запрос участника",
    "CTime": "2023-05-17T18:31:47Z",
    "CUser": 0,
    "ETime": "2023-05-17T18:31:47Z",
    "EUser": 0,
    "IsDeleted": false
  },
  {
    "Id": 0,
    "Code": "RQST",
    "Description": "Ответ на ЭС-запрос участника",
    "CTime": "2023-05-17T18:31:47Z",
    "CUser": 0,
    "ETime": "2023-05-17T18:31:47Z",
    "EUser": 0,
    "IsDeleted": false
  },
  {
    "Id": 0,
    "Code": "RQST",
    "Description": "Ответ на ЭС-запрос участника",
    "CTime": "2023-05-17T18:31:47Z",
    "CUser": 0,
    "ETime": "2023-05-17T18:31:47Z",
    "EUser": 0,
    "IsDeleted": false
  },
]

const ManualsContainer = () => <Manuals {...{manuals}}/>

export default connect(null, null)(ManualsContainer)