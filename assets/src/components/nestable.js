import React, { Component } from 'react'

import { Table } from './table'
import { SecurityHeader } from './security_row'


export default class Nestable extends Component {
  unnest = () => {
    const [_, ...hierarchy] = this.props.hierarchy
    return <Nestable hierarchy={hierarchy} />
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
