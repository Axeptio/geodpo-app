import React from 'react'
import { render } from 'react-dom'
import App from './App'
import Api from './Api/Api'
import 'react-select/dist/react-select.css';
//import ReactGA from 'react-ga'
import { hotjar } from 'react-hotjar';

//ReactGA.initialize('UA-XXXXXXXX')

hotjar.initialize(process.env.REACT_APP_HOTJAR_ID, process.env.REACT_APP_HOTJAR_VERSION);

const api = new Api({ baseURL: /*process.env.REACT_APP_GEODPO_API_URL*//*"http://localhost:3006/"*/"https://api.geodpo.eu/" });

const options = { api }

render(<App options={options}/>, document.getElementById('root'));
