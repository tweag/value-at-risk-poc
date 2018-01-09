import React, { Component } from 'react'

import SecurityTable from './security_table'
import classes from '../main.scss'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <h1>Some Portfolio</h1>
        <SecurityTable />
      </div>
    )
  }
}

export default App
