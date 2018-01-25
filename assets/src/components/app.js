import React, { Component } from 'react'

import Menu from './menu'
import Nestable from './nestable'
import BookTable from './book_table'
import SecurityTable from './security_table'
import { SecurityHeader, SecurityRow } from './security_row'

import classes from '../styles/main.scss'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Menu />
        <div className='content'>
          <h1>Client X</h1>
          <Nestable
            topLevel
            hierarchy={[
              BookTable,
              SecurityTable,
            ]}
          />
        </div>
      </div>
    )
  }
}

export default App
