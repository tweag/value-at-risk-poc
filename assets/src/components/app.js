import React, { Component } from 'react'
import Toggle from 'react-toggle'

import Menu from './menu'
import Nestable from './nestable'
import BookTable from './book_table'
import NestedBookTable from './nested_book_table'
import NestedRegionTable from './nested_region_table'
import RegionTable from './region_table'
import SecurityTable from './security_table'
import { SecurityHeader } from './security_row'

import classes from '../styles/main.scss'
import 'react-toggle/style.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { toggleHierarchy: false }
  }

  render () {
    const bookHierarchy = [
      BookTable,
      NestedRegionTable,
      SecurityTable,
    ]
    const regionHierarchy = [
      RegionTable,
      NestedBookTable,
      SecurityTable,
    ]
    const { toggleHierarchy } = this.state
    const hierarchy = toggleHierarchy ? regionHierarchy : bookHierarchy
    return (
      <div className='app'>
        <Menu />
        <div className='content'>
          <div className='toggle'>
            <span>Book</span>
            <Toggle
              defaultChecked={ toggleHierarchy }
              onChange={ () => this.setState({ toggleHierarchy: !toggleHierarchy }) }
              icons={ false }
            />
            <span>Region</span>
          </div>
          <table className='securities'>
            <thead>
              <SecurityHeader />
            </thead>
            <tbody>
              <Nestable
                topLevel
                hierarchy={hierarchy}
              />
            </tbody>
          </table>
          <div className='histogram'>
            [histogram_placeholder]
          </div>
        </div>
      </div>
    )
  }
}

export default App
