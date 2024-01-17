import React from 'react'
import  ReactDOM  from 'react-dom'

import './index.css'
import App from './App.js'

import { BrowserRouter as Router } from 'react-router-dom'
import { StateProvider } from './contex/stateprovider.js'
import { initailState } from './contex/initialState.js'
import reducer from './contex/reducer.js'

ReactDOM.render(
    <React.StrictMode>
     <Router>
        <StateProvider initailState={initailState} reducer={reducer}>
          <App/>
        </StateProvider>
     </Router>
    </React.StrictMode>
 , document.getElementById('root'))
