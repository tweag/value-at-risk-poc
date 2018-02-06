import React, { Component } from 'react'

import Menu from './menu'
import Nestable from './nestable'
import BookTable from './book_table'
import NestedBookTable from './nested_book_table'
import NestedRegionTable from './nested_region_table'
import RegionTable from './region_table'
import SecurityTable from './security_table'
import { SecurityHeader } from './security_row'

import classes from '../styles/main.scss'

class App extends Component {
  render () {
    const hierarchy = [
      BookTable,
      NestedRegionTable,
      SecurityTable,
    ]
    const otherHierarchy = [
      RegionTable,
      NestedBookTable,
      SecurityTable,
    ]
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
                hierarchy={otherHierarchy}
              />
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App
