import React, { Component } from 'react'

import Menu from './menu'
import Nestable from './nestable'
import BookTable from './book_table'
import SecurityTable from './security_table'
import { SecurityHeader } from './security_row'

import classes from '../styles/main.scss'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Menu />
        <div className='content'>
          <h1>Client X</h1>
          <table className='securities'>
            <thead>
              <SecurityHeader />
            </thead>
            <tbody>
              <Nestable
                topLevel
                hierarchy={[
                  BookTable,
                  SecurityTable,
                ]}
              />
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App
