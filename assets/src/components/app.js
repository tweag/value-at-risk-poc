import React, { Component } from 'react'

import Menu from './menu'
import SecurityTable from './security_table'

import classes from '../styles/main.scss'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Menu />
        <div className='content'>
          <h1>Client X</h1>
          <SecurityTable />
        </div>
      </div>
    )
  }
}

export default App
