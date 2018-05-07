import React from 'react'
import { render } from 'react-dom'
import App from './App'
import Api from './Api/Api'
//import ReactGA from 'react-ga'

//ReactGA.initialize('UA-XXXXXXXX')

const api = new Api({ baseURL: process.env.REACT_APP_GEODPO_API_URL });

const options = { api }

render(<App options={options}/>, document.getElementById('root'));