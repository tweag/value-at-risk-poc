import React, { Component } from 'react'

import { Table } from './table'
import { SecurityHeader } from './security_row'


export default class Nestable extends Component {
  unnest = (props) => {
    const [_, ...hierarchy] = this.props.hierarchy
    return <Nestable hierarchy={hierarchy} {...props} />
  }

  render () {
    const NextComponent = this.props.hierarchy[0]
    return (
      <NextComponent
        topLevel={ this.props.topLevel }
        unnest={ this.unnest } />
    )
  }
}
